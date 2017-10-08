/**
 * Got methods to convert objects to series.
 * 
 * @class SeriesConverter
 */
class SeriesConverter {

	/**
	 * 
	 * Converts a object to a list.
	 * 
	 * @static
	 * @param {any} object 
	 * @memberof SeriesConverter
	 */
	static convert(series) {
		series.seasons.forEach(season => {
			season.episodes.forEach(episode => {
				episode.watched = false;
			});
		});
		return series;
	}

	static merge(updated, current) {
		return updated;
	}
}

export default SeriesConverter;