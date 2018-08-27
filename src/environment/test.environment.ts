import { EnvironmentType } from "@environment/environment"

const environment: EnvironmentType = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBIdEMoGyVhG7vEuFONf43h9K4lJvqbjg8",
        authDomain: "viewcachu-firebase-mock.firebaseapp.com",
        databaseURL: "https://viewcachu-firebase-mock.firebaseio.com",
        projectId: "viewcachu-firebase-mock",
        storageBucket: "viewcachu-firebase-mock.appspot.com",
        messagingSenderId: "506827361279"
    },
    themoviedb: "?api_key=2e74839a423b1266f0ccf5043bade403",
    websocketurl: "ws://tv.websocket.slyox.de"
}

export default environment