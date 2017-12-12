import Firebase from '@service/firebase/Firebase';
import SeriesConverter from '@service/series/SeriesConverter';

/**
 * Includes methods to communicate with the user database.
 * 
 * @export 
 * @class UserRepository
 */
class UserRepository {
	constructor() {
		let self = this;
		this.fb = new Firebase();
		if(this.fb.isLoggedIn()) {
			this.uid = this.fb.user.uid;
		} else {
			this.uid = null;
		}
	
		this.isUserInDb(result => {
			if(!result) {
				self.addUserToDb();
			}
		});
	}

	isUserInDb(callback) {
		this.fb.get(`/users/${this.uid}`).then(val => {
			if(val == null) {
				return callback(false);
			}
			callback(true);
		});
	}

	addUserToDb() {
		if(this.uid === null || this.uid === '')
			throw this.exception('UID is not defined.');
		this.fb.write(`/users/${this.uid}`, { series: []});
	}

	hasSeries(id, callback) {
		this.getSeries(id, (val) => {
			if(val === null) {
				return callback(false);
			}
			callback(true);
		});
	}

	/**
	 * Returns all the series from the user with a promise.
	 * 
	 * @returns {Promise.<Series>} called after reading the data
	 * @memberof UserRepository
	 */
	getAllSeries() {
		return this.fb.get(`/users/${this.uid}/series`).then(val => {
			
			const tempArray = [];
			for(let key in val) { 
				tempArray.push(val[key]);
			}

			return Promise.resolve(tempArray);
		});
	}

	getSeries(id, callback) {
		this.fb.get(`/users/${this.uid}/series/${id}`).then(val => {
			return callback(val);
		});
	}

	addSeries(series) {
		if(this.uid === null || this.uid === '' || series === null)
			throw this.exception('UID or series is not defined.');
		this.getSeries(series.id, result => {
			let userSeries = null;
			if (result) {
				userSeries = SeriesConverter.merge(series, result);
			} else {
				userSeries = SeriesConverter.convert(series);
			}
			this.fb.write(`/users/${this.uid}/series/${series.id}`, userSeries);
		});
	}

	removeSeries(id, callback) {
		if(this.uid === null || this.uid === '' || id === null)
			throw this.exception('UID or series is not defined.');
		this.fb.remove(`/users/${this.uid}/series/${id}`).then(callback());
	}

	updateWatchedSeries(series) {
		if(this.uid === null || this.uid === '' || series === null)
			throw this.exception('UID or series is not defined.');
		this.fb.write(`/users/${this.uid}/series/${series.id}`, series);
	}

	exception(str) {
		return {
			message: str,
			toString: () => str
		};
	}
}

export default UserRepository;