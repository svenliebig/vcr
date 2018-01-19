node {
	checkout scm

	withEnv([
		'npm_config_cache=npm-cache',
		'HOME=.',
	]) {

		stage('Install') {
			docker.image('node:latest').inside {
				sh 'npm --version'
				sh 'npm install'
			}
		}

		stage('Build') {
			docker.image('node:latest').inside {
				sh 'npm run build-css'
				sh 'npm run build-js'
			}
		}

		stage('Test') {
			docker.image('node:latest').inside {
				sh 'npm run testc -- --verbose'
			}
		}
	}
}
