import environment from "@environment/environment"
import firebase from "firebase/app"
import FirebaseAuth from "vcr-shared/service/FirebaseAuth"
import FirebaseDatabase from "vcr-shared/service/FirebaseDatabase"
import UserRepository from "vcr-shared/service/UserRepository"
import SeriesRepository from "vcr-shared/service/SeriesRepository"

const app = firebase.initializeApp(environment.firebase)

export default class ServiceFactory {
    private static authInstance: FirebaseAuth
    private static databaseInstance: FirebaseDatabase
    private static userInstance: UserRepository
    private static seriesInstance: SeriesRepository

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

    public static get user(): UserRepository {
        if (ServiceFactory.userInstance) {
            return ServiceFactory.userInstance
        }

        ServiceFactory.userInstance = UserRepository.instance
        return ServiceFactory.userInstance
    }

    public static get series(): SeriesRepository {
        if (ServiceFactory.seriesInstance) {
            return ServiceFactory.seriesInstance
        }

        ServiceFactory.seriesInstance = new SeriesRepository(ServiceFactory.database)
        return ServiceFactory.seriesInstance
    }
}