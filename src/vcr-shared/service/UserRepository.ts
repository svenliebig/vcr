import SeriesConverter from "../converter/SeriesConverter"
import SeriesModel from "../models/SeriesModel"
import FirebaseAuth from "../service/FirebaseAuth"
import FirebaseDatabase from "../service/FirebaseDatabase"
import { UserFirebase, SeriesFirebase } from "../service/FirebaseTypes"
import SeriesPriority from "../models/SeriesPriority"

export type UserRepositoryResponse = {
    series: Array<SeriesFirebase>
    name: "string" | undefined
    uid: string | undefined
}

/**
 * Includes methods to communicate with the user database.
 *
 * @export
 * @class UserRepository
 */
export default class UserRepository {
    public static instance: UserRepository

    private uid: string | null = null

    constructor(private database: FirebaseDatabase, private auth?: FirebaseAuth) {
        const self = this
        UserRepository.instance = this

        if (this.auth) {
            if (this.auth.isLoggedIn()) {
                this.uid = this.auth.user.uid
                this.isUserInDb(result => {
                    if (!result) {
                        self.addUserToDb()
                    }
                })
            }
        }
    }

    public getCurrentUserUid() {
        return this.uid
    }

    public async checkUser() {
        const exist = await this.isUserInUserDirectory()
        if (!exist && this.auth) {
            const { displayName, uid } = this.auth.user
            if (displayName) {
                this.writeUserToUserDirectory(displayName)
            } else {
                const name = await this.database.get(`/users/${this.uid}/name`)
                if (name) {
                    this.auth.user.updateProfile({ displayName: name, photoURL: null })
                    this.writeUserToUserDirectory(name)
                } else {
                    this.auth.user.updateProfile({ displayName: uid, photoURL: null })
                    this.writeUserToUserDirectory(uid)
                }
            }
        }
    }
    
    public setPriority(id: number, priority: SeriesPriority) {
        return this.database.write(`/users/${this.uid}/series/${id}/priority`, priority)
    }

    public getUserByName(username: string) {
        return this.database.getWhere("/users", "name", username).then((val: { [key: string]: UserFirebase }) => {
            const tempArray: Array<UserRepositoryResponse> = []

            for (const key in val) {
                const seriesArray: Array<SeriesFirebase> = []
                const a = val[key]
                const ss = a.series
                for (const s in ss) {
                    const sss = ss[s] as any as SeriesFirebase
                    seriesArray.push(sss)
                }

                const newResponse = Object.assign({}, {
                    series: seriesArray,
                    name: a.name,
                    uid: a.uid
                })

                tempArray.push(newResponse)
            }

            return Promise.resolve(tempArray)
        })
    }

    public getUsers(): Promise<Array<UserFirebase>> {
        return this.database.get(`/users`).then((users: { [key: string]: UserFirebase }) => {
            const tempArray = []
            for (const key in users) {
                const seriesArray = []
                for (const s in users[key].series) {
                    seriesArray.push(users[key].series[s])
                }
                users[key].series = seriesArray
                tempArray.push(users[key])
            }
            return Promise.resolve(tempArray)
        })
    }

    public getUserDirectory() {
        return this.database.get(`/user-directory`).then(val => {
            const tempArray: Array<{ uid: string, name: string }> = []
            for (const key in val) {
                tempArray.push(val[key])
            }
            return Promise.resolve(tempArray)
        })
    }

    public isUserInDb(callback: (val: boolean) => void) {
        this.database.get(`/users/${this.uid}`).then(val => callback(val !== null))
    }

    public addUserToDb() {
        this.database.write(`/users/${this.uid}`, {
            series: []
        })
    }

    public hasSeries(id: number, uid: string | null = this.uid) {
        return this.getSeries(id, uid).then(val => Promise.resolve(val !== null))
    }

    public getFinishedSeries(uid: string | null = this.uid) {
        return this.database.getWhere(`/users/${uid}/series`, "isCompletlyWatched", true).then(val => {
            return Promise.resolve(SeriesConverter.firebaseArrayToModelArray(val))
        })
    }

    public getOpenSeries(uid: string | null = this.uid) {
        return this.database.getWhere(`/users/${uid}/series`, "isCompletlyWatched", false).then(val =>
            Promise.resolve(SeriesConverter.firebaseArrayToModelArray(val))
        )
    }

    /**
     * Returns all the series from the user with a promise.
     *
     * @returns {Promise.<Array<Series>>} called after reading the data
     * @memberof UserRepository
     */
    public getAllSeries(uid: string | null = this.uid) {
        return this.database.get(`/users/${uid}/series`).then(val =>
            Promise.resolve(SeriesConverter.firebaseArrayToModelArray(val))
        )
    }

    public getSeries(id: number, uid: string | null = this.uid): Promise<SeriesModel | null> {
        return this.database.get(`/users/${uid}/series/${id}`).then(val => {
            if (val) {
                return Promise.resolve(SeriesConverter.firebaseToModel(val))
            }
            return Promise.resolve(null)
        })
    }

    public addSeries(series: SeriesFirebase, uid: string | null = this.uid) {
        this.checkArgs(series, uid)
        return this.getSeries(series.id, uid).then(result => {
            let userSeries: SeriesModel
            if (result) {
                userSeries = SeriesConverter.mergeModels(SeriesConverter.firebaseToModel(series), result)
            } else {
                userSeries = SeriesConverter.firebaseToModel(series)
            }
            userSeries.isCompletlyWatched = userSeries.isWatched()
            return this.database.write(`/users/${uid}/series/${series.id}`, userSeries)
        })
    }

    /**
     * removes the series with the given id from the /user/series database
     *
     * @param {number} id
     * @param {string | null} [uid=this.uid]
     * @returns
     * @memberof UserRepository
     */
    public removeSeries(id: number, uid: string | null = this.uid): Promise<void> {
        this.checkArgs(id, uid)
        return this.database.remove(`/users/${uid}/series/${id}`)
    }

    // User Specific

    public getName() {
        if (this.auth) {
            return Promise.resolve(this.auth.user.displayName!)
        }
        return Promise.reject("Nicht eingeloggt")
    }

    public setName(name: string) {
        if (this.auth) {
            this.auth.user.updateProfile({ displayName: name, photoURL: null })
            return this.database.write(`/user-directory/${this.uid}/name`, name)
        }
        return Promise.reject("Nicht eingeloggt")
    }

    public updateWatchedSeries(series: SeriesModel) {
        this.checkArgs(series)
        series.isCompletlyWatched = series.isWatched()
        return this.database.write(`/users/${this.uid}/series/${series.id}`, series)
    }

    private checkArgs(args: any, uid: string | null = this.uid) {
        if (uid === null || uid === "" || args === null) {
            throw this.exception("UID or series is not defined.")
        }
    }

    private exception(str: string) {
        return {
            message: str,
            toString: () => str
        }
    }

    private isUserInUserDirectory() {
        return this.database.exists(`/user-directory/${this.uid}`)
    }

    private writeUserToUserDirectory(username: string) {
        return this.database.write(`/user-directory/${this.uid}`, { uid: this.uid, name: username })
    }
}