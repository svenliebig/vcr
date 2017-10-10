import environment from "../../environment/environment";
import * as firebase from 'firebase';

class Firebase {
	constructor() {
		this.error = undefined;
		this.app = firebase.initializeApp(environment.firebase);
		this.db = this.app.database();
		this.auth = this.app.auth();
		this.afterLogin = () => {};
		let self = this;
		this.user = JSON.parse(localStorage.getItem('firebase-user-login'));
		this.auth.onAuthStateChanged(function(user) {
			if (user) {
				self.afterLogin();
				self.user = user;
				window.localStorage.setItem('firebase-user-login', JSON.stringify(user));
			} else {
				window.localStorage.removeItem('firebase-user-login');
			}
		});
	}

	setAfterLogin(callback) {
		this.afterLogin = callback;
	}

	getError() {
		return this.error;
	}

	getUser() {
		return this.auth.currentUser;
	}

	write(where, value) {
		this.db.ref(where).set(value);
	}

	get(str, callback) {
		this.db.ref(str).once('value').then((snapshot) => {
			callback(snapshot.val());
		});
	}

	remove(str, callback) {
		this.db.ref(str).remove().then(() => {
			callback();
		});
	}

	isLoggedIn() {
		return !!this.user;
	}

	login(email, password) {
		var that = this;
		this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			that.error = errorMessage;
		});
	}

	logout() {
		this.auth.signOut();
	}

	createUser(email, password) {
		this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			
			console.log("Cant Register!");
			console.log("Exception don't hurt me!");
			console.log("Don't hurt me!");
			console.log("No more!");
			console.log(errorCode);
			console.log(errorMessage);
		});
	}
}

export default new Firebase();