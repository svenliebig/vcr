import environment from "@environment/environment"
import firebase from "firebase/app"
import FirebaseAuth from "vcr-shared/service/FirebaseAuth"
import FirebaseDatabase from "vcr-shared/service/FirebaseDatabase"
import UserRepository from "vcr-shared/service/UserRepository"
import SeriesRepository from "vcr-shared/service/SeriesRepository"
import MessageRepository from "@service/Message/MessageRepository"
import Moviedb from "vcr-shared/service/Moviedb"

const app = firebase.initializeApp(environment.firebase)

export default class ServiceFactory {
    private static authInstance: FirebaseAuth
    private static databaseInstance: FirebaseDatabase
    private static userInstance: UserRepository
    private static seriesInstance: SeriesRepository
    private static messageInstance: MessageRepository
    private static seriesApiInstance: Moviedb

    public static get auth(): FirebaseAuth {
        if (ServiceFactory.authInstance) {
            return ServiceFactory.authInstance
        }

        ServiceFactory.authInstance = new FirebaseAuth(app)
        return ServiceFactory.authInstance
    }

    public static get message(): MessageRepository {
        if (ServiceFactory.messageInstance) {
            return ServiceFactory.messageInstance
        }

        ServiceFactory.messageInstance = new MessageRepository()
        return ServiceFactory.messageInstance
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

    public static get seriesApi(): Moviedb {
        if (ServiceFactory.seriesApiInstance) {
            return ServiceFactory.seriesApiInstance
        }

        ServiceFactory.seriesApiInstance = new Moviedb(environment.themoviedb)
        return ServiceFactory.seriesApiInstance
    }
}