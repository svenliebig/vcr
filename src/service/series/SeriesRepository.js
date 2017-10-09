import Firebase from '../firebase/Firebase';

class SeriesRepository {
	constructor() {
		this.fb = Firebase;
	}

	getById(id, callback) {
		if(id == null || id == '')
			return callback(null);
		this.fb.get(`/series/${id}`, callback);
	}

	addSeries(series) {
		if(series == null || series.id == '')
			throw this.exception('series or VALUE is not defined.');
		this.fb.write(`/series/${series.id}`, series);
	}

	exception(str) {
		return {
			message: str,
			toString: () => str
		};
	}
}

export default new SeriesRepository();