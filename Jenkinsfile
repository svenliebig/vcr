pipeline {
    agent {docker 'node:9.4.0'

    stages {
        stage('Build') {
            steps {
                echo 'Building.. ${env.BUILD_ID} bla ${env.JENKINS_URL}'
		sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
