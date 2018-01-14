import Firebase from '../firebase/Firebase';

/**
 * asd
 *
 * @export
 * @class SeriesRepository
 */
class SeriesRepository {
	constructor() {
		this.fb = new Firebase();
	}

	getSeries(id) {
		if (id == null || id === '') {
			return  Promise.resolve(null)
		}
		return this.fb.get(`/series/${id}`).then(val => {
			return Promise.resolve(val);
		});
	}

	addSeries(series) {
		if (series == null || series.id === '') {
			throw this.exception('series or VALUE is not defined.')
		}

		this.getLinksOfSeries(series.id).then((links) => {
			if (links) {
				series.links = links;
			}
			this.fb.write(`/series/${series.id}`, series);
		});
	}

	/**
	 * Returns the bs.to links from this series if one exists. If not it returns null.
	 *
	 * @param {number} id Of the series
	 * @returns {Promise.<string>} called after reading the data
	 * @memberof SeriesRepository
	 */
	getBurningSeriesLink(id) {
		return this.fb.get(`/series/${id}/bstolink`).then(val => {
			return Promise.resolve(val);
		})
	}

	/**
	 * Writes a bs.to link into the database, to a specific series.
	 *
	 * @param {number} id Of the series
	 * @param {string} val Link of the series to bs.to
	 * @returns {Promise.<>} called after reading the data
	 * @memberof SeriesRepository
	 */
	saveBurningSeriesLink(id, val) {
		return this.fb.write(`/series/${id}/bstolink`, val).then(val => {
			return Promise.resolve(val);
		})
	}

	/**
	 *
	 * @param {*} id
	 * @param {*} link
	 * @param {*} val
	 */
	saveLinkToSeries(id, type, val) {
		return this.fb.write(`/series/${id}/links/${type}`, val).then(val => {
			return Promise.resolve(val);
		});
	}

	/**
	 *
	 * @param {*} id
	 */
	getLinksOfSeries(id) {
		return this.fb.get(`/series/${id}/links`).then(val => {
			return Promise.resolve(val);
		});
	}

	exception(str) {
		return {
			message: str,
			toString: () => str
		};
	}
}

export default SeriesRepository;