import environment from "../../environment/environment";
import * as firebase from 'firebase';

class Firebase {
	constructor() {
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
				console.log(`logged in: ${user.uid}`);
			} else {
				window.localStorage.removeItem('firebase-user-login');
				console.log(`not logged`);
			}
		});
	}

	setAfterLogin(callback) {
		this.afterLogin = callback;
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

	isLoggedIn() {
		console.log(this.user);
		return !!this.user;
	}

	login(email, password) {
		console.log("try to log in");
		this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			console.log(errorMessage);
			console.log("Cant login!");
			console.log("Exception don't hurt me!");
			console.log("Don't hurt me!");
			console.log("No more!");
		}).then(() => {
			console.log("logged in");
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