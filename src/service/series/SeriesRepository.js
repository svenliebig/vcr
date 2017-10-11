import Firebase from '../firebase/Firebase';

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

	exception(str) {
		return {
			message: str,
			toString: () => str
		};
	}
}

export default new SeriesRepository();