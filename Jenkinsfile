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

  stage('Build') {
    docker.image('node:6.3').inside {
      sh 'npm --version'
      sh 'npm install'
    }
  }

  stage('npm install') {
    npm install
  }

  stage('npm install2') {
    cd vcr
    npm install
  }
}
