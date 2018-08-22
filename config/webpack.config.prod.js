'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getClientEnvironment = require('./env');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
	throw new Error('Production builds must have NODE_ENV=production.');
}

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
	? // Making sure that the publicPath goes back to to build folder.
	{ publicPath: Array(cssFilename.split('/').length).join('../') }
	: {};

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
	mode: "production",
	bail: true,
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: [require.resolve('./polyfills'), paths.appIndexJs],
	output: {
		path: paths.appBuild,
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
		publicPath: publicPath,
		devtoolModuleFilenameTemplate: info =>
			path
				.relative(paths.appSrc, info.absoluteResourcePath)
				.replace(/\\/g, '/')
	},
	resolve: {
		modules: ['node_modules', paths.appNodeModules].concat(
			process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
		),
		extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.tsx', '.ts'],
		alias: {
			'react-native': 'react-native-web',
			'@service': paths.appSrc + '/service',
			'@components': paths.appSrc + '/components',
			'@scenes': paths.appSrc + '/scenes',
			'@environment': paths.appSrc + '/environment',
			'@model': paths.appSrc + '/model'
		},
		plugins: [
			new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
		]
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|jsx)$/,
				enforce: 'pre',
				use: [
					{
						options: {
							formatter: eslintFormatter,
							eslintPath: require.resolve('eslint'),

						},
						loader: require.resolve('eslint-loader'),
					}
				],
				include: paths.appSrc
			},
			{
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: './node_modules/tslint-loader/index.js',
                        options: {
							configFile: './tslint.json'
						}
                    }
                ],
				include: paths.appSrc
            },
			{
				oneOf: [
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]',
						}
					},
					{
						test: /\.(js|jsx)$/,
						include: paths.appSrc,
						loader: require.resolve('babel-loader'),
						options: {
							compact: true
						}
					},
					{
						test: /\.(ts|tsx)$/,
						include: paths.appSrc,
						loader: [
							require.resolve('babel-loader'),
							require.resolve('ts-loader')
						]
					},
					{
						test: /\.css$/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
								options: {
								  // you can specify a publicPath here
								  // by default it use publicPath in webpackOptions.output
								  publicPath: '../'
								}
							  },
							  {
								  loader: require.resolve('css-loader'),
								  options: {
									  importLoaders: 1,
									  minimize: true,
									  sourceMap: shouldUseSourceMap
								  }
							  },
							  {
								  loader: require.resolve('postcss-loader'),
								  options: {
									  // Necessary for external CSS imports to work
									  // https://github.com/facebookincubator/create-react-app/issues/2677
									  ident: 'postcss',
									  plugins: () => [
										  require('postcss-flexbugs-fixes'),
										  autoprefixer({
											  browsers: [
												  '>1%',
												  'last 4 versions',
												  'Firefox ESR',
												  'not ie < 9'
											  ],
											  flexbox: 'no-2009'
										  })
									  ]
								  }
							  }
						]
						// 	Object.assign(
						// 		{
						// 			fallback: require.resolve('style-loader'),
						// 			use: [
						// 			],
						// 		},
						// 		extractTextPluginOptions
						// 	)
						// )
					},
					{
						loader: require.resolve('file-loader'),
						exclude: [/\.js$/, /\.html$/, /\.json$/, /\.ts$/],
						options: {
							name: 'static/media/[name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		new webpack.DefinePlugin(env.stringified),
		// Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
		// new ExtractTextPlugin({
		// 	filename: cssFilename
		// }),

		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		// Generate a manifest file which contains a mapping of all asset filenames
		// to their corresponding output file so that tools can pick it up without
		// having to parse `index.html`.
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
		}),
		// Generate a service worker script that will precache, and keep up to date,
		// the HTML & assets that are part of the Webpack build.
		new SWPrecacheWebpackPlugin({
			// By default, a cache-busting query parameter is appended to requests
			// used to populate the caches, to ensure the responses are fresh.
			// If a URL is already hashed by Webpack, then there is no concern
			// about it being stale, and the cache-busting can be skipped.
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'service-worker.js',
			logger(message) {
				if (message.indexOf('Total precache size is') === 0) {
					// This message occurs for every build and is a bit too noisy.
					return;
				}
				if (message.indexOf('Skipping static resource') === 0) {
					// This message obscures real errors so we ignore it.
					// https://github.com/facebookincubator/create-react-app/issues/2612
					return;
				}
				console.log(message);
			},
			minify: true,
			// For unknown URLs, fallback to the index page
			navigateFallback: publicUrl + '/index.html',
			// Ignores URLs starting from /__ (useful for Firebase):
			// https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
			navigateFallbackWhitelist: [/^(?!\/__).*/],
			// Don't precache sourcemaps (they're large) and build asset manifest:
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
		}),
		// Moment.js is an extremely popular library that bundles large locale files
		// by default due to how Webpack interprets its code. This is a practical
		// solution that requires the user to opt into importing specific locales.
		// https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
		// You can remove this if you don't use Moment.js:
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	],
	optimization: {
		minimize: true
		// minimizez: [
		// 	new webpack.optimize.UglifyJsPlugin({
		// 		compress: {
		// 			warnings: false,
		// 			// Disabled because of an issue with Uglify breaking seemingly valid code:
		// 			// https://github.com/facebookincubator/create-react-app/issues/2376
		// 			// Pending further investigation:
		// 			// https://github.com/mishoo/UglifyJS2/issues/2011
		// 			comparisons: false
		// 		},
		// 		output: {
		// 			comments: false,
		// 			// Turned on because emoji and regex is not minified properly using default
		// 			// https://github.com/facebookincubator/create-react-app/issues/2488
		// 			ascii_only: true
		// 		},
		// 		sourceMap: shouldUseSourceMap
		// 	})
		// ]
	},
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	}
};
