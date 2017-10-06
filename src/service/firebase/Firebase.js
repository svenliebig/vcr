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

	write(where) {
		this.db.ref(where).set({
			username: "name",
			email: "email",
			profile_picture : "imageUrl"
		});
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

			console.log("THGIS CATCH");
			console.log(errorCode);
			console.log(errorMessage);
			// ...
		});
	}

	createUser(email, password) {
		this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});
	}
}

export default new Firebase();