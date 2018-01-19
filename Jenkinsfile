node('node') {	

    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Install'){

         sh 'npm install'

       }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'liebigsv@gmail.de',
            replyTo: 'liebigsv@gmail.com',
            subject: 'project build failed',
            to: 'liebigsv@gmail.com'

        throw err
    }
}
