import environment from "../../environment/environment"
import axios from 'axios'
import { Series, Season } from '../../model/Series'

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

		this.headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
	}

	/**
	 * Calls the API and returns a Promise with the a Series and the number of total seasons.
	 *
	 * @param {number} id ID of the series
	 * @return {Promise<Series, number>}
	 * @memberof SeriesapiService
	 */
	getSeries(id) {
		const url = `${this.API_URL}${this.BY_ID}${id}${environment.themoviedb}${this.LANG_PARAM}`;
		return this.callApi(url).then(res => Promise.resolve(Series.fromEntity(res)))
	}

	/**
	 * Calls the API and returns a Promise with the a series season.
	 *
	 * @param {number} id ID of the series
	 * @param {number} season Number of the season
	 * @return {Promise<Season>}
	 * @memberof SeriesapiService
	 */
	getSeriesSeason(id, season) {
		const url = `${this.API_URL}${this.BY_ID}${id}${this.SEASON}${season}${environment.themoviedb}${this.LANG_PARAM}`
		return this.callApi(url).then((res) => Promise.resolve(Season.fromEntity(res)))
	}

	/**
	 * Calls the API and returns a Episode
	 *
	 * @param {number} id ID of the series
	 * @param {number} season Number of the season
	 * @param {number} episode Number of the episode
	 * @return {Promise<any>}
	 * @memberof SeriesapiService
	 */
	getSeriesEpisode(id, season, episode) {
		let url = `${this.API_URL}${this.BY_ID}${id}${this.SEASON}${season}`;
		url += `${this.EPISODE}${episode}${environment.themoviedb}${this.LANG_PARAM}`;
		return this.callApi(url)
	}

	/**
	 * Adds all available Season the given series argument.
	 *
	 * @param {Series} series
	 * @param {number} seasonNumber
	 * @param {number} lastSeason
	 *
	 * @return {Promise<Series>}
	 */
	addSeasons(series, seasonNumber) {
		if (seasonNumber === 0) {
			return this.addSeasons(series, ++seasonNumber, series.seasonsCount)
		} else if (seasonNumber === -1) {
			return this.addSeasons(series, ++seasonNumber, --series.seasonsCount)
		}

		return this.getSeriesSeason(series.id, seasonNumber).then(season => {
			series.seasons.push(season)

			if (series.seasons.length === series.seasonsCount) {
				series.seasons.sort((a, b) => {
					return a.seasonNumber - b.seasonNumber;
				})
				return Promise.resolve(series);
			} else {
				return this.addSeasons(series, ++seasonNumber, series.seasonsCount)
			}
		})
	}

	/**
	 * Returns a complete {@link Series} object with seasons and episodes.
	 *
	 * @param {number} id ID of the Series
	 *
	 * @return {Promise<Series>}
	 * @memberof SeriesapiService
	 */
	getCompleteSeries(id) {
		return this.getSeries(id).then((series) => {
			return this.addSeasons(series, 0)
		})
	}

	/**
	 * Calls the API and returns a Promise with series Array.
	 *
	 * @param {string} name Name of the Series that are searched
	 * @returns {Promise<any>}
	 * @memberof SeriesapiService
	 */
	findSerieByName(name) {
		const url = `${this.API_URL}${this.BY_NAME}${environment.themoviedb}&query=${name}${this.LANG_PARAM}`
		return this.callApi(url).then(res => Promise.resolve(res.results))
	}

	/**
	 * Returns a delayed promise, apply the promise as () => Promise.resolve(any)
	 *
	 * @param {number} t time that the returned promise is delayed
	 * @param {Function: Promise<any>} v the promise shall be resolved
	 * @returns {Promise<any>}
	 */
	delay(t, v) {
		return new Promise(resolve => {
			setTimeout(resolve.bind(null, v), t)
		})
	}

	/**
	 * Calls an api url and returns a promise with the data or null.
	 *
	 * @param {string} url
	 * @returns {Promise<any | null}
	 */
	callApi(url) {
		return axios.get(url, { headers: this.headers })
			.then(data => {
				if (data && data.status === 200) {
					return Promise.resolve(data.data)
				} else {
					return Promise.resolve(null)
				}
			})
			.catch(() => {
				return this.delay(1000).then(() => this.callApi(url))
			})
	}
}

export default SeriesapiService;