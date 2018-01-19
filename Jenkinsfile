node {
  checkout scm
  HOME=.

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
      sh 'npm install'
    }
  }

  stage('npminstall') {
    npm install
  }

  stage('npminstall2') {
    cd vcr
    npm install
  }
}
