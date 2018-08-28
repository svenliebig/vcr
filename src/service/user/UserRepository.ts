import Firebase, { UserFirebase, SeriesFirebase } from "@service/firebase/Firebase"
import SeriesConverter from "@converter/SeriesConverter"
import SeriesModel from "@model/SeriesModel"

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
    private fb = new Firebase()
    private uid: string | null = null

    constructor() {
        const self = this

        if (this.fb.isLoggedIn()) {
            this.uid = this.fb.user.uid
        }

        this.isUserInDb(result => {
            if (!result) {
                self.addUserToDb()
            }
        })
    }

    public getUserByName(username: string) {
        return this.fb.getWhere("/users", "name", username).then((val: { [key: string]: UserFirebase }) => {
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
        return this.fb.get(`/users`).then((users: { [key: string]: UserFirebase }) => {
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

    getUserNames() {
        return this.fb.get(`/users`).then(val => {
            const tempArray = []
            for (const key in val) {
                tempArray.push(key)
            }
            return Promise.resolve(tempArray)
        })
    }

    public isUserInDb(callback: (val: boolean) => void) {
        this.fb.get(`/users/${this.uid}`).then(val => callback(val !== null))
    }

    public addUserToDb() {
        this.fb.write(`/users/${this.uid}`, {
            series: []
        })
    }

    public hasSeries(id: number) {
        return this.getSeries(id).then(val => {
            if (val === null) {
                return Promise.resolve(false)
            }
            return Promise.resolve(true)
        })
    }

    getFinishedSeries() {
        return this.fb.getWhere(`/users/${this.uid}/series`, "isCompletlyWatched", true).then(val => {
            return Promise.resolve(SeriesConverter.firebaseArrayToModelArray(val))
        })
    }

    getOpenSeries() {
        return this.fb.getWhere(`/users/${this.uid}/series`, "isCompletlyWatched", false).then(val =>
            Promise.resolve(SeriesConverter.firebaseArrayToModelArray(val))
        )
    }

    /**
	 * Returns all the series from the user with a promise.
	 *
	 * @returns {Promise.<Array<Series>>} called after reading the data
	 * @memberof UserRepository
	 */
    getAllSeries() {
        return this.fb.get(`/users/${this.uid}/series`).then(val =>
            Promise.resolve(SeriesConverter.firebaseArrayToModelArray(val))
        )
    }

    getName() {
        return this.fb.get(`/users/${this.uid}/name`).then(val => {
            return Promise.resolve(val)
        })
    }

    setName(name: string) {
        return this.fb.write(`/users/${this.uid}/name`, name)
    }

    getSeries(id: number) {
        return this.fb.get(`/users/${this.uid}/series/${id}`).then(val => {
            if (val) {
                return Promise.resolve(SeriesConverter.firebaseToModel(val))
            }
            return Promise.resolve(val)
        })
    }

    public addSeries(series: SeriesFirebase) {
        this.checkArgs(series)
        return this.getSeries(series.id).then(result => {
            let userSeries: SeriesModel
            if (result) {
                userSeries = SeriesConverter.mergeModels(SeriesConverter.firebaseToModel(series), result)
            } else {
                userSeries = SeriesConverter.firebaseToModel(series)
            }
            userSeries.isCompletlyWatched = userSeries.isWatched()
            return this.fb.write(`/users/${this.uid}/series/${series.id}`, userSeries)
        })
    }

    /**
	 * removes the series with the given id from the /user/series database
	 *
	 * @param {number} id
	 * @returns {Promise<>}
	 */
    removeSeries(id: number) {
        this.checkArgs(id)
        return this.fb.remove(`/users/${this.uid}/series/${id}`)
    }

    updateWatchedSeries(series: SeriesModel) {
        this.checkArgs(series)
        series.isCompletlyWatched = series.isWatched()
        return this.fb.write(`/users/${this.uid}/series/${series.id}`, series)
    }

    checkArgs(args: any) {
        if (this.uid === null || this.uid === "" || args === null) {
            throw this.exception("UID or series is not defined.")
        }
    }

    exception(str: string) {
        return {
            message: str,
            toString: () => str
        }
    }
}