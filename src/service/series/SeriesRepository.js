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

	getById(id, callback) {
		if(id == null || id == '')
			return callback(null);
		this.fb.get(`/series/${id}`).then(val => callback(val));
	}

	addSeries(series) {
		if(series == null || series.id == '')
			throw this.exception('series or VALUE is not defined.');
		
		// TODO Wenn custom links hinzugefügt werden muss hier gemerged werden

		// this.getSeries(series.id, result => {
		// 	let userSeries = null;
		// 	if (result) {
		// 		userSeries = SeriesConverter.merge(series, result);
		// 	} else {
		// 		userSeries = SeriesConverter.convert(series);
		// 	}
		// 	this.fb.write(`/users/${this.uid}/series/${series.id}`, userSeries);
		// });
		this.fb.write(`/series/${series.id}`, series);
	}

	/**
	 * Returns the bs.to links from this series if one exists. If not it returns null.
	 * 
	 * @param {number} id Of the series
	 * @returns {Promise.<string>} called after reading the data
	 * @memberof SeriesRepository
	 */
	getBurningSeriesLink(id) {
		return this.fb.get(`/series/${id}`).then(val => {
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