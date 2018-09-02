import environment from "@environment/environment"
import firebase from "firebase/app"
import FirebaseAuth from "vcr-shared/service/FirebaseAuth"
import FirebaseDatabase from "vcr-shared/service/FirebaseDatabase"

const app = firebase.initializeApp(environment.firebase)
export default class ServiceFactory {
    private static authInstance: FirebaseAuth
    private static databaseInstance: FirebaseDatabase

    public static get auth(): FirebaseAuth {
        if (ServiceFactory.authInstance) {
            return ServiceFactory.authInstance
        }

        ServiceFactory.authInstance = new FirebaseAuth(app)
        return ServiceFactory.authInstance
    }

    public static get database(): FirebaseDatabase {
        if (ServiceFactory.databaseInstance) {
            return ServiceFactory.databaseInstance
        }

        ServiceFactory.databaseInstance = new FirebaseDatabase(app)
        return ServiceFactory.databaseInstance
    }
}