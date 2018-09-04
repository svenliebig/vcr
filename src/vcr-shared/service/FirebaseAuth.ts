import firebase from "firebase/app"

/**
 * Includes methods to commicate with the firebase database.
 *
 * @export
 * @class Firebase
 */
export default class FirebaseAuth {
    public user: firebase.User

    private auth: firebase.auth.Auth
    private error: any

    constructor(app: firebase.app.App) {
        this.error = undefined
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