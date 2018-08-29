const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getClientEnvironment = require('./env');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const publicPath = paths.servedPath;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

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
        alias: require("./aliases"),
        plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
    },
    module: {
        strictExportPresence: true,
        rules: [{
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                use: [{
                    loader: './node_modules/tslint-loader/index.js',
                    options: {
                        configFile: './tslint.json'
                    }
                }],
                include: paths.appSrc
            },
            {
                oneOf: [{
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
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
                        use: [{
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: publicPath
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
                    },
                    {
                        test: /\.less$/,
                        use: [{
                                loader: require.resolve('style-loader') // creates style nodes from JS strings
                            }, {
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
                            }, {
                                loader: require.resolve('less-loader') // compiles Less to CSS
                            }
                        ]
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
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[id].[chunkhash:8].css"
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        }),
        new SWPrecacheWebpackPlugin({
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    return;
                }
                console.log(message);
            },
            minify: true,
            navigateFallback: publicUrl + '/index.html',
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                sourceMap: false,
                parallel: true,
            }),
        ],
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};