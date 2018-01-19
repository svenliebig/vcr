node {
  checkout scm

  withEnv([
	/* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
	'npm_config_cache=npm-cache',
	/* set home to our current directory because other bower
	* nonsense breaks with HOME=/, e.g.:
	* EACCES: permission denied, mkdir '/.config'
	*/
	'HOME=.',
  ]

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
