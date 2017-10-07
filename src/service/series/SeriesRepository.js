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

	addSeries(id, value) {
		if(id == null || id == '')
			throw this.exception('ID or VALUE is not defined.');
		this.fb.write(`/series/${id}`, value);
	}

	exception(str) {
		return {
			message: str,
			toString: () => str
		};
	}
}

export default SeriesRepository;