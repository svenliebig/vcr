
import moment from 'moment';

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
		this.updated = moment().format('DD.MM.YYYY');
	}

	get $name() {
		return this.name;
	}

	set $name(value) {
		this.name = value;
	}


	get $id() {
		return this.id;
	}

	set $id(value) {
		this.id = value;
	}


	get $overview() {
		return this.overview;
	}

	set $overview(value) {
		this.overview = value;
	}

	get $airDate() {
		return this.airDate;
	}

	set $airDate(value) {
		this.airDate = value;
	}

	get $posterUrl() {
		return this.posterUrl;
	}

	set $posterUrl(value) {
		this.posterUrl = value;
	}

	get $rating() {
		return this.rating;
	}

	set $rating(value) {
		this.rating = value;
	}

	get $votes() {
		return this.votes;
	}

	set $votes(value) {
		this.votes = value;
	}

	get $seasons() {
		return this.seasons;
	}

	set $seasons(value) {
		this.seasons = value;
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

	get $name() {
		return this.name;
	}

	set $name(value) {
		this.name = value;
	}

	get $overview() {
		return this.overview;
	}

	set $overview(value) {
		this.overview = value;
	}

	get $seasonNumber() {
		return this.seasonNumber;
	}

	set $seasonNumber(value) {
		this.seasonNumber = value;
	}

	get $episodes() {
		return this.episodes;
	}

	set $episodes(value) {
		this.episodes = value;
	}

	get $episodeAmout() {
		return this.episodeAmout;
	}

	set $episodeAmout(value) {
		this.episodeAmout = value;
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

	get $name() {
		return this.name;
	}

	set $name(value) {
		this.name = value;
	}

	get $overview() {
		return this.overview;
	}

	set $overview(value) {
		this.overview = value;
	}

	get $airDate() {
		return this.airDate;
	}

	set $airDate(value) {
		this.airDate = value;
	}
}