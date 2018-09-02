export type UserFirebase = {
    name?: "string",
    series: Array<{ [key: string]: SeriesFirebase }>,
    uid?: string
}

export type EpisodeFirebase = {
    airDate: string,
    /**
     * index starts at 1
     *
     * @type {number}
     */
    episode: number,
    name: string,
    /**
     * index starts at 1
     *
     * @type {number}
     */
    season: number,
    watched: boolean
}

export type SeasonFirebase = {
    episodeAmount: number,
    episodes: Array<EpisodeFirebase>,
    seasonNumber: number
}

export type SeriesFirebase = {
    /**
     * @type {string}
     * @example
     * "2005-09-19"
     */
    airDate: string,
    backdropUrl: string,
    bstolink: string,
    country: Array<string>,
    createdBy: Array<{
        credit_id: string,
        /**
         * 2 male 1 female
         *
         * @type {number}
         */
        gender: 1 | 2,
        id: number,
        name: string,
        profile_path?: string
    }>,
    episodeDuration: Array<number>,
    genres: Array<string>,
    id: number,
    isCompletlyWatched: boolean,
    name: string,
    overview: string
    posterUrl: string,
    rating: number,
    seasons: Array<SeasonFirebase>,
    status: string,
    votes: number,
    seasonsCount: number
}

/**
 * Includes methods to commicate with the firebase database.
 *
 * @export
 * @class Firebase
 */
export default class Firebase {
    public user: firebase.User

    private db: firebase.database.Database
    private auth: firebase.auth.Auth
    private error: any

    constructor(app: firebase.app.App) {
        this.error = undefined
        this.db = app.database()
        this.auth = app.auth()
        this.user = JSON.parse(localStorage.getItem("firebase-user-login") as any)

        const self = this
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                self.user = user
                window.localStorage.setItem("firebase-user-login", JSON.stringify(user))
            } else {
                window.localStorage.removeItem("firebase-user-login")
            }
        })
    }

    /**
     * Writes data to the node, the provided value should be an object or string.
     * After the action, a promises is returned and can be used.
     *
     * @param {String} path the node to write the datavalue
     * @param {{ [key: string]: string } | string} value the value to write on the node
     * @returns {Promise<void>} after the data was written
     * @memberof Firebase
     *
     * @example
     * instance.write("/my/path", { my: "object" }).then(() => console.log("done!"))
     */
    public write(path: string, value: { [key: string]: string } | string | Object): Promise<void> {
        return this.db.ref(path).set(value)
    }

    /**
     * Reads the value of the given node and returns a promise with the value.
     *
     * @param {String} path the node where to read the value
     * @return {Promise.<any>} called with the value after reading
     * @memberof Firebase
     */
    public get(path: string): Promise<any> {
        return this.db.ref(path).once("value")
            .then(snapshot => Promise.resolve(snapshot.val()))
    }

    /**
	 * Returns the node that match the given criteria. For example the parameters
	 * '/users', 'id' and '12345' will return a object from the node users where
	 * users/{userkey}/id equals 12345. {userkey} is one of the firebase automatic generated
	 * unqiue keys for a node. getWhere will iteratre through all childs, no matter what key they have.
	 *
	 * @param {string} node
	 * @param {string} child
	 * @param {string | boolean | number | object} value
	 */
    public getWhere(node: string, child: string, value: string | boolean | number | null) {
        return this.db.ref(node).orderByChild(child).equalTo(value).once("value").then(snapshot => {
            const val = snapshot.val()
            if (val === null) {
                return null
            }
            if (Array.isArray(val)) {
                return Promise.resolve(val.filter(e => e))
            }
            return Promise.resolve(val)
        })
    }

    /**
     * Removes the node from the database and calls the optional callback after this.
     *
     * @param {String} path node to remove
     * @return {Promise<void>} called after the remove
     * @memberof Firebase
     */
    public remove(path: string): Promise<void> {
        return this.db.ref(path).remove()
    }

    /**
     * Checks if the given node exists in the database and returns a promise with true of false.
     *
     * @param {String} path the node to check if it exists
     * @return {Promise<boolean>} true if the node exists, false if not
     * @memberof Firebase
     */
    public exists(path: string): Promise<boolean> {
        return this.db.ref(path).once("value")
            .then(snapshot => Promise.resolve(snapshot.exists()))
    }

    /**
     * Returns if the user is logged in.
     *
     * @returns {boolean} true if the user is logged in, false if not.
     * @memberof Firebase
     */
    public isLoggedIn(): boolean {
        return !!this.user
    }

    /**
	 * Returns the user that is currently logged in.
	 *
	 * @returns a user object
	 * @memberof Firebase
	 */
    public getUser() {
        return this.auth.currentUser
    }

    /**
	 * Login a user with the given credentials.
	 * After the process, a promise is called.
	 *
	 * @param {String} email email adress of the user
	 * @param {String} password password of the user
	 * @return {Promise.<>} and empty promise
	 * @memberof Firebase
	 */
    public login(email: string, password: string) {
        const that = this

        return this.auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                const errorCode = error.code

                if (errorCode === "auth/invalid-email") {
                    that.error = "Your email is not vaild."
                } else if (errorCode === "auth/user-not-found") {
                    that.error = "No user found with matching email adddress."
                } else if (errorCode === "auth/user-disabled") {
                    that.error = "Your account got disabled."
                } else if (errorCode === "auth/wrong-password") {
                    that.error = "Invaild Password."
                } else {
                    that.error = "Something went wrong, please try again later."
                }
                return Promise.resolve()
            })
            .then(() => Promise.resolve())
    }

    /**
	 * Creates a user with the given credentials.
	 * After the process, a promise is called.
	 *
	 * @param {String} email email adress of the user
	 * @param {String} password password of the user
	 * @return {Promise.<>} and empty promise
	 * @memberof Firebase
	 */
    public createUser(email: string, password: string) {
        const that = this

        return this.auth.createUserWithEmailAndPassword(email, password)
            .catch(error => {
                const errorCode = error.code

                if (errorCode === "auth/invalid-email") {
                    that.error = "Your email is not vaild."
                } else if (errorCode === "auth/weak-password") {
                    that.error = "Password is not long enough or not complex enough."
                } else if (errorCode === "auth/wrong-password") {
                    that.error = "Invaild Password."
                } else {
                    that.error = "Something went wrong, please try again later."
                }
                return Promise.resolve()
            })
            .then(() => Promise.resolve())
    }

    /**
	 * Logout the user.
	 *
	 * @memberof Firebase
	 */
    public logout() {
        this.auth.signOut()
    }

    /**
	 * Returns an error string if one exists, else undefined.
	 *
	 * @returns {String} the error string
	 * @memberof Firebase
	 */
    public getError() {
        return this.error
    }

    /**
	 * Clears the error array.
	 *
	 * @memberof Firebase
	 */
    public clearError() {
        this.error = null
    }
}