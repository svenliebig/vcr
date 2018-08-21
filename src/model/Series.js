import moment from 'moment';

/**
 * Represents an episode of a series.
 *
 * @export
 * @class Episode
 */
export class Episode {

	/**
	 * Creates an instance of Episode.
	 * @param {string} [name=''] Name of this episode.
	 * @param {string} [airdate=''] Air date of this episode.
	 * @memberof Episode
	 */
	constructor(name = '', airdate = '', season = 0, episode = 0) {
		this.name = name;
		this.airDate = airdate;
		this.season = season;
		this.episode = episode;
		this.watched = false;
	}

	isNotAired() {
		return moment(this.airDate).isAfter()
	}

	isAired() {
		return !this.isNotAired()
	}

	/**
	 * Returns if the series is aired and not watched.
	 */
	isNotWatchedAndAired() {
		return !this.watched && this.isAired()
	}

	isWatchedOrNotAired() {
		return this.isWatched() || this.isNotAired()
	}

	isWatchedAndAired() {
		return this.watched && this.isAired()
	}

	isWatched() {
		return this.watched
	}

	isNotWatched() {
		return !this.watched
	}

	/**
	 * Creates an instance of this class from an entity model.
	 *
	 * @static
	 * @param {any} episode the entity
	 * @returns an instance of {Episode}
	 * @memberof Episode
	 */
	static fromEntity(episode) {
		const thisEpisode = new Episode()
		thisEpisode.name = episode.name
		thisEpisode.airDate = episode.air_date
		thisEpisode.season = episode.season_number
		thisEpisode.episode = episode.episode_number
		thisEpisode.watched = false
		return thisEpisode
	}

	static fromFirebase(eps) {
		const thisEpisode = new Episode(eps.name, eps.airDate, eps.season, eps.episode)
		thisEpisode.watched = eps.watched
		return thisEpisode;
	}
}

/**
 * Represents a series season.
 *
 * @export
 * @class Season
 */
export class Season {

	/**
	 * Creates an instance of Season.
	 *
	 * @param {string} [name=''] Name of the season.
	 * @param {string} [overview=''] Description of this season.
	 * @param {number} [seasonNumber=0] Number of this season.
	 * @param {Array<Episode>} [episodes=new Array<Episode>()] Array of episodes that are in this season.
	 * @param {number} [episodeAmount=0] Number of total episodes of this season.
	 * @memberof Season
	 */
	constructor(seasonNumber = 0, episodes = [], episodeAmount = 0) {
		this.seasonNumber = seasonNumber
		this.episodes = episodes
		this.episodeAmount = episodeAmount
	}

	/**
	 * Creates an instance of this class from an entity model.
	 *
	 * @static
	 * @param {any} season the entity
	 * @returns an instance of {Season}
	 * @memberof Season
	 */
	static fromEntity(season) {
		const thisSeason = new Season()
		thisSeason.seasonNumber = season.season_number
		thisSeason.episodeAmount = season.episodes.length
		season.episodes.forEach((episode) => {
			thisSeason.episodes.push(Episode.fromEntity(episode))
		})
		return thisSeason;
	}

	static fromFirebase(season) {
		const newSeason = new Season(season.seasonNumber, [], season.episodeAmount)

		if (season.episodeAmount !== 0) {
			season.episodes.forEach((episode) => {
				newSeason.episodes.push(Episode.fromFirebase(episode))
			})
		}

		return newSeason
	}

	isNotWatchedAndAired() {
		if (this.episodeAmount === 0) {
			return false
		}

		return this.episodes.some(episode => episode.isNotWatchedAndAired())
	}

	isWatched() {
		if (this.episodeAmount === 0) {
			return true
		}

		return !this.episodes.some(episode => episode.isNotWatched())
	}
}

/**
 * Represents a series.
 *
 * @export
 * @class Series
 */
export class Series {

	/**
	 * Creates an instance of Series.
	 *
	 * @param {number} id
	 * @param {string} [name=''] Name of the series.
	 * @param {string} [overview=''] Descriptionb of the series.
	 * @param {string} [airDate=''] First air date of the series.
	 * @param {string} [posterUrl=''] Poster URL of the series.
	 * @param {number} [rating=0] Average rating of the series.
	 * @param {number} [votes=0] Count of votes on this series.
	 * @param {Array<Season>} [seasons=new Array<Season>()] Array with seasons and episodes.
	 * @memberof Series
	 */
	constructor(id, name = '', overview = '', airDate = '', posterUrl = '', rating = 0, votes = 0, seasons = []) {
		this.id = id
		this.name = name
		this.overview = overview
		this.airDate = airDate
		this.posterUrl = posterUrl
		this.rating = rating
		this.votes = votes
		this.seasons = seasons
		this.genres = []
		this.country = []
		this.status = ""
		this.createdBy = []
		this.seasonsCount = 0
		this.episodeDuration = []
		this.bstolink = ''
	}

	/**
	 *
	 * @param {Array<Object>} val
	 * @return {Array<Series>}
	 */
	static fromFirebaseArray(val) {
		const array = [];
		for (let key in val) {
			array.push(Series.fromFirebase(val[key]));
		}
		return array;
	}

	averageDuration() {
		if (Array.isArray(this.episodeDuration) && this.episodeDuration.length > 0) {
			return this.episodeDuration.reduce((p, n) => p + n, 0) / this.episodeDuration.length
		}
		return 0
	}

	totalMinutesNotWatched() {
		if (Array.isArray(this.seasons) && this.seasons.length > 0) {
			return this.seasons.reduce((counter, season) => {
				if (season && Array.isArray(season.episodes) && season.episodes.length > 0) {
					return counter + season.episodes.reduce((counter, episode) => {
						return !episode.watched ? this.averageDuration() + counter : counter
					}, 0)
				}
				return counter
			}, 0)
		}
		return 0
	}

	static fromFirebase(series) {
		const newSeries = new Series(series.id, series.name, series.overview, series.airDate, series.posterUrl, series.rating)
		newSeries.votes = series.votes
		newSeries.genres = series.genres || []
		newSeries.country = series.country || []
		newSeries.status = series.status
		newSeries.createdBy = series.createdBy || ""
		newSeries.episodeDuration = series.episodeDuration
		newSeries.seasonsCount = series.seasonsCount || (series.seasons && series.seasons.length) || 0

		if (series.seasons) {
			series.seasons.forEach((season) => {
				newSeries.seasons.push(Season.fromFirebase(season))
			})
		}

		return newSeries
	}

	/**
	 * Creates an instance of this class from an entity model.
	 *
	 * @static
	 * @param {Series} series the entity
	 * @returns {Series} an instance of {Series}
	 * @memberof Series
	 */
	static fromEntity(series) {
		const thisSeries = new Series(series.id);
		thisSeries.name = series.name;
		thisSeries.overview = series.overview;
		thisSeries.airDate = series.first_air_date;
		thisSeries.posterUrl = `${series.backdrop_path}`;
		thisSeries.rating = series.vote_average;
		thisSeries.votes = series.vote_count;
		thisSeries.seasonsCount = series.number_of_seasons
		thisSeries.genres = [];

		if (series.genres) {
			series.genres.forEach(val => thisSeries.genres.push(val.name))
		}

		thisSeries.country = series.origin_country;
		thisSeries.status = series.status;
		thisSeries.createdBy = series.created_by;
		thisSeries.episodeDuration = series.episode_run_time;
		return thisSeries;
	}

	/**
	 * Returns true if all episodes have the flag watched == true.
	 *
	 * @returns {boolean} true if everything is watched, false if not
	 * @memberof Series
	 */
	isWatched() {
		let result = true
		this.seasons.forEach(season => {
			if (!season.isWatched()) {
				result = false
				return
			}
		})
		return result
	}
}