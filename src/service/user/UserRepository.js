import Firebase from '@service/firebase/Firebase'
import SeriesConverter from '@service/series/SeriesConverter'
import { Series } from '../../model/Series'

/**
 * Includes methods to communicate with the user database.
 *
 * @export
 * @class UserRepository
 */
export default class UserRepository {
	constructor() {
		let self = this;
		this.fb = new Firebase();
		if (this.fb.isLoggedIn()) {
			this.uid = this.fb.user.uid;
		} else {
			this.uid = null;
		}

		this.isUserInDb(result => {
			if (!result) {
				self.addUserToDb();
			}
		});
	}

	getUserByName(username) {
		return this.fb.getWhere("/users", "name", username).then(val => {
			const tempArray = [];
			for (let key in val) {
				const seriesArray = [];
				for (let s in val[key].series) {
					seriesArray.push(val[key].series[s])
				}
				val[key].series = seriesArray
				tempArray.push(val[key]);
			}

			return Promise.resolve(tempArray)
		});
	}

	getUsers() {
		return this.fb.get(`/users`).then(val => {
			const tempArray = [];
			for (let key in val) {
				const seriesArray = [];
				for (let s in val[key].series) {
					seriesArray.push(val[key].series[s])
				}
				val[key].series = seriesArray
				tempArray.push(val[key]);
			}
			return Promise.resolve(tempArray);
		});
	}

	getUserNames() {
		return this.fb.get(`/users`).then(val => {
			const tempArray = [];
			for (let key in val) {
				tempArray.push(key);
			}
			return Promise.resolve(tempArray);
		})
	}

	isUserInDb(callback) {
		this.fb.get(`/users/${this.uid}`).then(val => {
			if (val == null) {
				return callback(false);
			}
			callback(true);
		});
	}

	addUserToDb() {
		this.fb.write(`/users/${this.uid}`, { series: [] });
	}

	hasSeries(id) {
		return this.getSeries(id).then(val => {
			if (val === null) {
				return Promise.resolve(false)
			}
			return Promise.resolve(true)
		})
	}

	getFinishedSeries() {
		return this.fb.getWhere(`/users/${this.uid}/series`, 'isCompletlyWatched', true).then(val => {
			return Promise.resolve(Series.fromFirebaseArray(val))
		})
	}

	getOpenSeries() {
		return this.fb.getWhere(`/users/${this.uid}/series`, 'isCompletlyWatched', false).then(val =>
			Promise.resolve(Series.fromFirebaseArray(val))
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
			Promise.resolve(Series.fromFirebaseArray(val))
		)
	}

	getName() {
		return this.fb.get(`/users/${this.uid}/name`).then(val => {
			return Promise.resolve(val);
		})
	}

	setName(name) {
		return this.fb.write(`/users/${this.uid}/name`, name);
	}

	getSeries(id) {
		return this.fb.get(`/users/${this.uid}/series/${id}`).then(val => {
			return Promise.resolve(Series.fromFirebase(val))
		})
	}

	addSeries(series) {
		this.checkArgs(series)
		return this.getSeries(series.id).then(result => {
			let userSeries = null
			if (result) {
				userSeries = SeriesConverter.merge(series, result)
			} else {
				userSeries = SeriesConverter.convert(series)
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
	removeSeries(id) {
		this.checkArgs(id)
		return this.fb.remove(`/users/${this.uid}/series/${id}`)
	}

	updateWatchedSeries(series) {
		this.checkArgs(series)
		series.isCompletlyWatched = series.isWatched()
		return this.fb.write(`/users/${this.uid}/series/${series.id}`, series)
	}

	checkArgs(args) {
		if (this.uid === null || this.uid === '' || args === null) {
			throw this.exception('UID or series is not defined.')
		}
	}

	exception(str) {
		return {
			message: str,
			toString: () => str
		}
	}
}