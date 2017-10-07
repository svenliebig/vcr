import environment from "../../environment/environment";
import axios from 'axios';
import { Series, Season, Episode } from '../../model/Series';

/**
 * Service for the API of themoviedb.org.
 * Developers Guide https://developers.themoviedb.org/3
 *
 * @export
 * @class SeriesapiService
 */
class SeriesapiService {
	constructor() {
		/** Url der API. */
		this.API_URL = 'https://api.themoviedb.org/3';

		/** URL der Poster */
		this.POSTER_URL = 'https://image.tmdb.org/t/p/w300';

		/** Key um Serien anhand des Namens zu suchen. */
		this.BY_NAME = '/search/tv';

		/** Key um Serien datails anhand der ID zu finden. */
		this.BY_ID = '/tv/';

		/** Key um Season datails anhand der ID zu finden. */
		this.SEASON = '/season/';

		/** Key um Episode datails anhand der ID zu finden. */
		this.EPISODE = '/episode/';

		/** Setzt die Ausgabesprache der API, default: Deutsch */
		this.LANG_KEY = 'de.xml';

		/** Setzt die Ausgabesprache der API als Parameter, default: Deutsch */
		this.LANG_PARAM = '&language=de';

		this.headers  = { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
	}

	/**
	 * Calls the API and returns a Series.
	 * 
	 * @param {number} id ID of the series
	 * @param {*} callback Callback with parameter that returns the data
	 * @memberof SeriesapiService
	 */
	getSeries(id, callback) {
		const url = `${this.API_URL}${this.BY_ID}${id}${environment.themoviedb}${this.LANG_PARAM}`;
		this.callApi(url, callback, false);
	}

	/**
	 * Calls the API and returns a Season.
	 * 
	 * @param {number} id ID of the series
	 * @param {number} season Number of the season
	 * @param {*} callback Callback with parameter that returns the data
	 * @memberof SeriesapiService
	 */
	getSeriesSeason(id, season, callback) {
		const url = `${this.API_URL}${this.BY_ID}${id}${this.SEASON}${season}${environment.themoviedb}${this.LANG_PARAM}`;
		this.callApi(url, callback, false);
	}

	/**
	 * Calls the API and returns a Episode
	 * 
	 * @param {number} id ID of the series
	 * @param {number} season Number of the season
	 * @param {number} episode Number of the episode
	 * @param {*} callback Callback with parameter that returns the data
	 * @memberof SeriesapiService
	 */
	getSeriesEpisode(id, season, episode, callback) {
		let url = `${this.API_URL}${this.BY_ID}${id}${this.SEASON}${season}`;
		url += `${this.EPISODE}${episode}${environment.themoviedb}${this.LANG_PARAM}`;
		this.callApi(url, callback, false);
	}

	/**
	 * 
	 * Returns a complete {@link Series} object with seasons and episodes.
	 * 
	 * @param {number} id ID of the Series
	 * @param {*} [callback=(series: Series) void => {}]  Callback with Series as parameter
	 * @memberof SeriesapiService
	 */
	getCompleteSeries(id, callback) {
		const self = this;
		this.getSeries(id, (seriesData) => {
			const name = seriesData.name;
			const overview = seriesData.overview;
			const airDate = seriesData.first_air_date;
			const series = new Series(id, name, overview, airDate);
			series.$posterUrl = `${self.POSTER_URL}${seriesData.backdrop_path}`;
			series.$rating = seriesData.vote_average;
			series.$votes = seriesData.vote_count;
			const lastSeason = seriesData.number_of_seasons;

			// console.log(seriesData);

			seriesData.seasons.forEach(seasonIterator => {
				if (seasonIterator.season_number !== 0) {
					self.getSeriesSeason(id, seasonIterator.season_number, (seasonData) => {
						const seasonName = seasonData.name;
						const totalEpisodes = seasonData.episodes.length;
						const seasonNumber = seasonData.season_number;
						const season = new Season(seasonName, totalEpisodes, seasonNumber);

						seasonData.episodes.forEach(episode => {
							season.$episodes.push(new Episode(episode.name, episode.overview, episode.air_date));
						});
						series.$seasons.push(season);

						if (seasonNumber === lastSeason) {
							series.$seasons.sort((a, b) => {
								return a.$seasonNumber - b.$seasonNumber;
							});
							callback(series);
						}
					});
				}
			});
		});
	}

	/**
	 * Calls the API and returns a {@link SeriesInfoResponseByName} Array to the callback.
	 *
	 * @param {string} name Name of the Series that are searched
	 * @callback callback Calls this function after the api call with an Array of SeriesInfoResponseByName
	 * @memberof SeriesapiService
	 */
	findSerieByName(name, callback) {
		const url = `${this.API_URL}${this.BY_NAME}${environment.themoviedb}&query=${name}`;
		const findSeriesByNameCall = (res) => {
			callback(res.results);
		};
		this.callApi(url, findSeriesByNameCall);
	}

	callApi(url, callback) {
		let self = this;
		axios.get(url, { headers: this.headers })
		.then(data => {
			if(data.status == 200) {
				callback(data.data);
			} else {
				callback(null);
			}
		})
		.catch(error => {
			setTimeout(() => {
				self.callApi(url, callback);
			}, 1000);
		});
	}
}

export default SeriesapiService;