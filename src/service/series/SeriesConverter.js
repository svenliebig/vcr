/**
 * Got methods to convert objects to series.
 * 
 * @class SeriesConverter
 */
class SeriesConverter {

	/**
	 * Converts a series that comes directly from the moviedb Database.
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

	static merge(fromDb, fromUser) {
		fromDb.seasons.forEach((season, iSeason) => {
			if (fromUser.seasons.length > iSeason) {
				this.mergeSeason(fromUser.seasons[iSeason], season);
			}
		});
		return fromDb;
	}

	static mergeSeason(seasonUser, seasonDb) {
		seasonDb.episodes.forEach((episode, iEpisode) => {
			if (seasonUser.episodes.length > iEpisode) {
				episode.watched = seasonUser.episodes[iEpisode].watched;
			} else {
				episode.watched = false;
			}
		});
	}
}

export default SeriesConverter;