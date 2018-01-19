node {
	checkout scm

	withEnv([
		'npm_config_cache=npm-cache',
		'HOME=.',
	]) {

		stage('Build') {
			docker.image('node:latest').inside {
				sh 'npm --version'
				sh 'npm install'
			}
		}

		stage('Test') {
			docker.image('node:latest').inside {
				sh 'npm run testc -- --verbose'
			}
		}

		stage('Start') {
			docker.image('node:latest').inside {
				sh 'npm start'
			}
		}
	}
}
