import moment from 'moment';

const POSTER_URL = 'https://image.tmdb.org/t/p/w300';

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
	 * @param {any} [seasons=new Array<Season>()] Array with seasons and episodes.
	 * @memberof Series
	 */
	constructor(id, name = '', overview = '', airDate = '', posterUrl = '', rating = 0, votes = 0, seasons = []) {
		this.id = id;
		this.name = name;
		this.overview = overview;
		this.airDate = airDate;
		this.posterUrl = posterUrl;
		this.rating = rating;
		this.votes = votes;
		this.seasons = seasons;
		this.genres = [];
		this.country = [];
		this.status = "";
		this.createdBy = [];
		this.episodeDuration = [];
		this.updated = moment().format('DD.MM.YYYY');
	}

	/**
	 * Creates an instance of this class from an entity model.
	 * 
	 * @static
	 * @param {any} series the entity
	 * @returns an instance of {Series}
	 * @memberof Series
	 */
	static fromEntity(series) {
		const thisSeries = new Series(series.id);
		thisSeries.name = series.name;
		thisSeries.overview = series.overview;
		thisSeries.airDate = series.first_air_date;
		thisSeries.posterUrl = `${POSTER_URL}${series.backdrop_path}`;
		thisSeries.rating = series.vote_average;
		thisSeries.votes = series.vote_count;
		thisSeries.genres = series.genres;
		thisSeries.country = series.origin_country;
		thisSeries.status = series.status;
		thisSeries.createdBy = series.created_by;
		thisSeries.episodeDuration = series.episode_run_time;
		return thisSeries;
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
	 * @param {any} [episodes=new Array<Episode>()] Array of episodes that are in this season.
	 * @param {number} [episodeAmount=0] Number of total episodes of this season.
	 * @memberof Season
	 */
	constructor(name = '', overview = '', seasonNumber = 0, episodes = [], episodeAmount = 0) {
		this.name = name;
		this.overview = overview;
		this.seasonNumber = seasonNumber;
		this.episodes = episodes;
		this.episodeAmount = episodeAmount;
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
		const thisSeason = new Season();
		thisSeason.name = season.name;
		thisSeason.overview = season.overview;
		thisSeason.seasonNumber = season.season_number;
		thisSeason.episodeAmount = season.episodes.length;
		thisSeason.airDate = season.air_date;
		thisSeason.posterUrl = `${POSTER_URL}${season.poster_path}`;
		season.episodes.forEach((episode) => {
			thisSeason.episodes.push(Episode.fromEntity(episode));
		});
		return thisSeason;
	}
}

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
	 * @param {string} [overview=''] Description of this episode.
	 * @param {string} [airdate=''] Air date of this episode.
	 * @memberof Episode
	 */
	constructor(name = '', overview = '', airdate = '', season = 0, episode = 0) {
		this.name = name;
		this.overview = overview;
		this.airDate = airdate;
		this.season = season;
		this.episode = episode;
		this.watched = false;
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
		const thisEpisode = new Episode();
		thisEpisode.name = episode.name;
		thisEpisode.overview = episode.overview;
		thisEpisode.airDate = episode.air_date;
		thisEpisode.season = episode.season_number;
		thisEpisode.episode = episode.episode_number;
		thisEpisode.posterUrl = `${POSTER_URL}${episode.still_path}`;
		thisEpisode.watched = false;
		return thisEpisode;
	}
}