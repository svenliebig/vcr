node {
  stage('HelloWorld') {
    echo 'Hello World'
  }

  stage('git clone') {
    git clone "https://github.com/Sly321/vcr.git"
  }

  stage('npm install') {
    cd vcr
    npm install
  }
}
