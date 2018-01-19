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

  stage('git clone') {
    git clone "git@github.com:Sly321/vcr.git"
  }

  stage('npm install') {
    cd vcr
    npm install
  }
}
