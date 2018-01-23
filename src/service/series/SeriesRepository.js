import Firebase from '../firebase/Firebase'
import { Series } from '@model/Series';


/**
 * Repository to communicate with the /series node in the database.
 *
 * @export
 * @class SeriesRepository
 */
class SeriesRepository {
	constructor() {
		this.fb = new Firebase()
	}

	/**
	 * returns the series that matches the given id.
	 *
	 * @param {number} id id of a series
	 */
	getSeries(id) {
		if (id == null || id === "") {
			return Promise.resolve(null)
		}

		return this.fb.get(`/series/${id}`).then(val => Promise.resolve(Series.fromFirebase(val)))
	}

	/**
	 * Add a series to the database.
	 *
	 * @param {Series} series
	 */
	addSeries(series) {
		if (series == null || series.id === '') {
			throw this.exception('series or VALUE is not defined.')
		}

		return this.getLinksOfSeries(series.id).then((links) => {
			if (links) {
				series.links = links;
			}
			return this.fb.write(`/series/${series.id}`, series)
		})
	}

	/**
	 * removes the series with the given id from the /series database
	 *
	 * @param {number} id
	 * @returns {Promise<>}
	 */
	removeSeries(id) {
		return this.fb.remove(`/series/${id}`)
	}

	/**
	 * Saves a specific link to a series.
	 *
	 * @param {number} id series id
	 * @param {string} link link type
	 * @param {string} val the url of the link
	 */
	saveLinkToSeries(id, type, val) {
		return this.fb.write(`/series/${id}/links/${type}`, val)
	}

	/**
	 * Returns all links that are save on a series within a promise.
	 *
	 * @param {*} id Id of the series
	 */
	getLinksOfSeries(id) {
		return this.fb.get(`/series/${id}/links`).then(val => Promise.resolve(val));
	}

	exception(str) {
		return {
			message: str,
			toString: () => str
		}
	}
}

export default SeriesRepository;