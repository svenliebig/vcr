import environment from "../../environment/environment";
import * as firebase from 'firebase';

const app = firebase.initializeApp(environment.firebase);

/**
 * Includes methods to commicate with the firebase database.
 * 
 * @export
 * @class Firebase
 */
class Firebase {
	
	constructor() {
		this.error = undefined;
		this.db = app.database();
		this.auth = app.auth();
		this.user = JSON.parse(localStorage.getItem('firebase-user-login'));
		let self = this;
		this.auth.onAuthStateChanged((user) => {
			if (user) {
				self.user = user;
				window.localStorage.setItem('firebase-user-login', JSON.stringify(user));
			} else {
				window.localStorage.removeItem('firebase-user-login');
			}
		});
	}

	/**
	 * Writes data to the node, the provided value should be an object or string. 
	 * After the action, a promise is returned and can be used.
	 * 
	 * @param {String} node the node to write the datavalue, format '/format/'
	 * @param {Object} value the value to write on the node, string or object: { value: 'myValue' }
	 * @return {Promise.<>} called after the writing
	 * @memberof Firebase
	 */
	write(node, value) {
		return this.db.ref(node).set(value)
		.then((val) => {
			return Promise.resolve()
		});
	}

	/**
	 * Reads the value of the given node and returns a promise with the value.
	 * 
	 * @param {String} node the node where to read the value
	 * @return {Promise.<any>} called with the value after reading
	 * @memberof Firebase
	 */
	get(node) {
		return this.db.ref(node).once('value')
		.then(snapshot => {
			return Promise.resolve(snapshot.val());
		});
	}
	
	/**
	 * Removes the node from the database and calls the optional callback after this.
	 * 
	 * @param {String} node node to remove
	 * @return {Promise.<>} called after the remove
	 * @memberof Firebase
	 */
	remove(node) {
		return this.db.ref(node).remove()
		.then(() => {
			return Promise.resolve();
		});
	}

	/**
	 * Checks if the given node exists in the database and returns a promise with true of false.
	 * 
	 * @param {String} node the node to check if it exists
	 * @return {Promise.<boolean>} true if the node exists, false if not
	 * @memberof Firebase
	 */
	exists(node) {
		return this.db.ref(node).once('value')
		.then(snapshot => { 
			return Promise.resolve(snapshot.exists());
		});
	}

	/**
	 * Returns if the user is logged in.
	 * 
	 * @returns {Boolean} true if the user is logged in, false if not.
	 * @memberof Firebase
	 */
	isLoggedIn() {
		return !!this.user;
	}

	/**
	 * Returns the user that is currently logged in.
	 * 
	 * @returns a user object
	 * @memberof Firebase
	 */
	getUser() {
		return this.auth.currentUser;
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
	login(email, password) {
		var that = this;
		return this.auth.signInWithEmailAndPassword(email, password)
		.catch(error => {
			var errorCode = error.code;

			if (errorCode === "auth/invalid-email") {
				that.error = "Your email is not vaild.";
			} else if (errorCode === "auth/user-not-found") {
				that.error = "No user found with matching email adddress."
			} else if (errorCode === "auth/user-disabled") {
				that.error = "Your account got disabled."
			} else if (errorCode === "auth/wrong-password") {
				that.error = "Invaild Password.";
			} else {
				that.error = "Something went wrong, please try again later."
			}
			return Promise.resolve();
		})
		.then(() => { return Promise.resolve() });
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
	createUser(email, password) {
		var that = this;
		return this.auth.createUserWithEmailAndPassword(email, password)
		.catch(error => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			that.error = errorMessage;
			return Promise.resolve();
		})
		.then(() => { return Promise.resolve() });
	}

	/**
	 * Logout the user.
	 * 
	 * @memberof Firebase
	 */
	logout() {
		this.auth.signOut();
	}
	
	/**
	 * Returns an error string if one exists, else undefined.
	 * 
	 * @returns {String} the error string
	 * @memberof Firebase
	 */
	getError() {
		return this.error;
	}
}

export default Firebase;