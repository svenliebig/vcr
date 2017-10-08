import Firebase from '@service/firebase/Firebase';
import SeriesConverter from '@service/series/SeriesConverter';

class UserRepository {
	constructor() {
		let self = this;
		this.fb = Firebase;
		if(this.fb.isLoggedIn()) {
		this.uid = this.fb.user.uid;
	} else {
		this.uid = null;
	}
	
		console.log(`construc`);
		this.isUserInDb(result => {
			console.log(`result: ${result}`);
			if(!result) {
				self.addUserToDb();
			}
		});
	}

	isUserInDb(callback) {
		this.fb.get(`/users/${this.uid}`, (val) => {
			if(val == null) {
				return callback(false);
			}
			callback(true);
		});
	}

	addUserToDb() {
		if(this.uid == null || this.uid == '')
			throw this.exception('UID is not defined.');
		this.fb.write(`/users/${this.uid}`, { series: []});
	}

	hasSeries(id, callback) {
		this.getSeries(id, (val) => {
			if(val == null) {
				return callback(false);
			}
			callback(true);
		});
	}

	getAllSeries(callback) {
		this.fb.get(`/users/${this.uid}/series`, (val) => {
			return callback(val);
		});
	}

	getSeries(id, callback) {
		this.fb.get(`/users/${this.uid}/series/${id}`, (val) => {
			return callback(val);
		});
	}

	addSeries(series) {
		if(this.uid == null || this.uid == '' || series == null)
			throw this.exception('UID or series is not defined.');
		this.hasSeries(series.id, result => {
			let userSeries = null;
			if (result) {
				userSeries = SeriesConverter.merge(series, result);
			}
			if(!result) {
				userSeries = SeriesConverter.convert(series);
			}
			this.fb.write(`/users/${this.uid}/series/${series.id}`, userSeries);
		});
	}

	exception(str) {
		return {
			message: str,
			toString: () => str
		};
	}
}

export default new UserRepository();