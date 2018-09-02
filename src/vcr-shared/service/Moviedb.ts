import axios from "axios"
import http from "http"
import https from "https"

import SeriesModel from "../models/SeriesModel"
import SeriesConverter from "../converter/SeriesConverter"
import SeasonConverter from "../converter/SeasonConverter"
import SeasonModel from "../models/SeasonModel"

export type SeasonEpisodeResponse = {
    air_date: string,
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    production_code: null,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
    crew: Array<unknown>,
    guest_stars: Array<unknown>
}

export type SeriesEpisodeResponse = {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    production_code: null
    season_number: number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
}

// https://api.themoviedb.org/3/tv/1402/season/0?api_key=2e74839a423b1266f0ccf5043bade403#
export type SeasonReponse = {
    _id: string
    episodes: Array<SeasonEpisodeResponse>

} & { [T in Exclude<keyof SeriesSeasonResponse, "episode_count">]: SeriesSeasonResponse[T] }

// SERIES

export type SeriesComponieResponse = {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export type SeriesGenreResponse = {
    id: number
    /**
     * @example
     * "Action & Adventure"
     */
    name: string
}

export type SeriesSeasonResponse = {
    episode_count: number
    air_date: string
    name: string
    overview: string
    id: number
    poster_path: string
    season_number: number
}

export type SeriesCreatedByResponse = {
    id: number
    credit_id: string
    name: string
    /**
     * 1 is female, 2 is male
     */
    gender: 1 | 2
    /**
     * @example
     * "/9KVvZtDyy8DXacw2TTsjC9VLxQi.jpg"
     */
    profile_path?: string
}

export type SeriesNetworkResponse = {
    name: string
    id: number
    /**
     * @example
     * "/pmvRmATOCaDykE6JrVoeYxlFHw3.png"
     */
    logo_path: string
    origin_country: string
}

// https://api.themoviedb.org/3/tv/1402?api_key=2e74839a423b1266f0ccf5043bade403
export type SeriesResponse = {
    /**
     * The path of the backdrop image
     *
     * @example
     * "/xVzvD5BPAU4HpleFSo8QOdHkndo.jpg"
     */
    backdrop_path: string
    created_by: Array<SeriesCreatedByResponse>
    episode_run_time: Array<number>
    /**
     * @example
     * "2010-10-31"
     */
    first_air_date: string
    genres: Array<SeriesGenreResponse>
    /**
     * @example
     * "http://www.amctv.com/shows/the-walking-dead/"
     */
    homepage: string
    id: number
    in_production: boolean
    /**
     * @example
     * ["en"]
     */
    languages: Array<string>
    /**
     * @example
     * "2010-10-31"
     */
    last_air_date: string
    last_episode_to_air: SeriesEpisodeResponse
    name: string
    next_episode_to_air: null
    networks: Array<SeriesNetworkResponse>
    number_of_episodes: number
    number_of_seasons: number
    /**
     * @example
     * ["US"]
     */
    origin_country: Array<string>
    /**
     * @example
     * "en"
     */
    original_language: string
    original_name: string
    overview: string
    /**
     * @example
     * 95.551
     */
    popularity: number
    /**
     * @example
     * "/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
     */
    poster_path: string
    production_companies: Array<SeriesComponieResponse>
    seasons: Array<SeriesSeasonResponse>
    /**
     * @example
     * "Returning Series"
     */
    status: string
    /**
     * @example
     * "Scripted"
     */
    type: string
    /**
     * @example
     * 7.3
     */
    vote_average: number
    vote_count: number
}
export type SeriesByNameSeriesResponse = {
    original_name: string
    id: number
    name: string
    vote_count: number
    vote_average: number
    poster_path: string
    first_air_date: string,
    popularity: number
    genre_ids: Array<number>
    original_language: string
    backdrop_path: string
    overview: string
    origin_country: Array<string>
}

export type SeriesByNameResponse = {
    page: number
    total_results: number
    total_pages: number
    results: Array<SeriesByNameSeriesResponse>
}

/**
 * Service for the API of themoviedb.org.
 * Developers Guide https://developers.themoviedb.org/3
 *
 * @export
 * @class SeriesapiService
 */
export default class SeriesapiService {
    /** Url der API. */
    private API_URL: string = "https://api.themoviedb.org/3"

    /** URL der Poster */
    // private POSTER_URL: string = "https://image.tmdb.org/t/p/w300"

    /** Key um Serien anhand des Namens zu suchen. */
    private BY_NAME: string = "/search/tv"

    /** Key um Serien datails anhand der ID zu finden. */
    private BY_ID: string = "/tv/"

    /** Key um Season datails anhand der ID zu finden. */
    private SEASON: string = "/season/"

    /** Key um Episode datails anhand der ID zu finden. */
    private EPISODE: string = "/episode/"

    /** Setzt die Ausgabesprache der API, default: Deutsch */
    // private LANG_KEY: string = "de.xml"

    /** Setzt die Ausgabesprache der API als Parameter, default: Deutsch */
    private LANG_PARAM: string = "&language=de"

    private headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    private agent = new https.Agent({
        keepAlive: true
    })

    private httpAgent = new http.Agent({
        keepAlive: true
    })

    constructor(private key: string) {
    }

    /**
     * Calls the API and returns a getSeriesSeason Series.
     *
     * @param {number} id ID of the series
     * @memberof SeriesapiService
     */
    public getSeries(id: number): Promise<SeriesModel> {
        const url = `${this.API_URL}${this.BY_ID}${id}${this.key}${this.LANG_PARAM}`
        return this.callApi(url).then((res: SeriesResponse) => Promise.resolve(SeriesConverter.responseToModel(res)))
    }

    /**
     * Calls the API and returns a Season.
     *
     * @param {number} id ID of the series
     * @param {number} season Number of the season
     * @memberof SeriesapiService
     */
    public getSeriesSeason(id: number, season: number): Promise<SeasonModel> {
        const url = `${this.API_URL}${this.BY_ID}${id}${this.SEASON}${season}${this.key}${this.LANG_PARAM}`
        return this.callApi(url).then((res: SeasonReponse) => Promise.resolve(SeasonConverter.responseToModel(res)))
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
    public getSeriesEpisode(id: number, season: number, episode: number) {
        let url = `${this.API_URL}${this.BY_ID}${id}${this.SEASON}${season}`
        url += `${this.EPISODE}${episode}${this.key}${this.LANG_PARAM}`
        return this.callApi(url)
    }

    /**
	 * Adds all available Season the given series argument.
	 *
	 * @param {Series} series
	 * @param {number} seasonNumber
	 *
	 * @return {Promise<Series>}
	 */
    public addSeasons(series: SeriesModel, _seasonNumber: number): Promise<SeriesModel> {
        let seasonNumber = _seasonNumber
        if (seasonNumber === 0) {
            return this.addSeasons(series, ++seasonNumber)
        } else if (seasonNumber === -1) {
            return this.addSeasons(series, ++seasonNumber)
        }

        return this.getSeriesSeason(series.id, seasonNumber).then(season => {
            series.seasons.push(season)

            if (series.seasons.length === series.seasonsCount) {
                series.seasons.sort((a, b) => {
                    return a.seasonNumber - b.seasonNumber
                })
                return Promise.resolve(series)
            } else {
                return this.addSeasons(series, ++seasonNumber)
            }
        })
    }

    /**
	 * Returns a complete {@link Series} object with seasons and episodes.
	 *
	 * @param {number} id ID of the Series
	 *
	 * @return {Promise<SeriesModel>}
	 * @memberof SeriesapiService
	 */
    public getCompleteSeries(id: number): Promise<SeriesModel> {
        return this.getSeries(id).then((series) => {
            return this.addSeasons(series, 0)
        })
    }

    /**
     * Calls the API and returns a {@link SeriesInfoResponseByName} Array to the callback.
     *
     * @param {string} name Name of the Series that are searched
     * @callback callback Calls this function after the api call with an Array of SeriesInfoResponseByName
     * @memberof SeriesapiService
     */
    public findSerieByName(name: string): Promise<Array<SeriesByNameSeriesResponse>> {
        const url = `${this.API_URL}${this.BY_NAME}${this.key}&query=${name}${this.LANG_PARAM}`
        return this.callApi(url).then((res: SeriesByNameResponse) => res.results)
    }

    /**
	 * Returns a delayed promise, apply the promise as () => Promise.resolve(any)
	 *
	 * @param {number} t time that the returned promise is delayed
	 * @param {Function: Promise<any>} v the promise shall be resolved
	 * @returns {Promise<any>}
	 */
    private delay(t: number) {
        return new Promise(resolve => {
            setTimeout(resolve.bind(null), t)
        })
    }

    private callApi(url: string): Promise<any> {
        return axios.get(url, {
            headers: this.headers,
            httpAgent: this.httpAgent,
            httpsAgent: this.agent
        })
            .then(data => {
                if (data && data.status === 200) {
                    return Promise.resolve(data.data)
                } else {
                    return Promise.resolve(null)
                }
            })
            .catch((e) => {
                if (e && e.response && e.response.status === 404) {
                    console.log(`Could not find ressource: ${url} - 404`)
                    return Promise.resolve()
                }

                return this.delay(1000).then(() => this.callApi(url))
            })
    }
}