node {
  checkout scm

  stage('HelloWorld') {
    echo 'Hello World'
  }

  stage('HelloWorld2') {
    echo 'Hello World2'
  }

  stage('Build') {
    docker.image('node:6.3').inside {
      sh 'npm --version'
    }
  }

  stage('Build2') {
    docker.image('node:6.3').inside {
      sh 'npm --version'
    }
  }

  stage('npminstall') {
    npm install
  }
}
