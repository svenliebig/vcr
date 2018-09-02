import Firebase from "vcr-shared/service/Firebase"
import firebase from "firebase/app"
import environment from "@environment/environment"

export default class ServiceFactory {
    private static firebaseInstance: Firebase

    public static get firebase(): Firebase {
        if (ServiceFactory.firebaseInstance) {
            return ServiceFactory.firebaseInstance
        }

        const app = firebase.initializeApp(environment.firebase)
        ServiceFactory.firebaseInstance = new Firebase(app)
        return ServiceFactory.firebaseInstance
    }
}