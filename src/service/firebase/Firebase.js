import environment from "../../environment/environment";
import * as firebase from 'firebase';

class Firebase {
	constructor() {
		this.app = firebase.initializeApp(environment.firebase);
		this.db = this.app.database();
		this.auth = this.app.auth();
		this.afterLogin = () => {};
		let self = this;
		this.auth.onAuthStateChanged(function(user) {
			if (user) {
				  console.log(`logged in: ${user.uid}`);
				  self.afterLogin();
			} else {
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

	login(email, password) {
		this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log("Cant login!");
			console.log("Exception don't hurt me!");
			console.log("Don't hurt me!");
			console.log("No more!");
			console.log(errorCode);
			console.log(errorMessage);
		});
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