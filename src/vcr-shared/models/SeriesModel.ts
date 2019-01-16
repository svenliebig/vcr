import SeasonModel from "./SeasonModel"
import { SeriesCreatedByResponse } from "../service/Moviedb"

/**
 * Represents a series.
 *
 * @export
 * @class Series
 */
export default class SeriesModel {
    public id: number
    public name: string
    public overview: string
    public airDate: string
    public posterUrl: string
    public backdropUrl: string
    public rating: number
    public votes: number
    public seasons: Array<SeasonModel>
    public genres: Array<string>
    public country: Array<string>
    public status: string
    public createdBy: Array<SeriesCreatedByResponse>
    public episodeDuration: Array<number>
    public seasonsCount: number
    public isCompletlyWatched: boolean = false

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
     * @memberof SeriesModel
     */
    constructor(id: number = 0, name: string = "", overview: string = "", airDate: string = "", posterUrl: string = "", rating: number = 0, votes: number = 0, seasons: Array<SeasonModel> = [], seasonsCount: number = 0) {
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
        this.episodeDuration = []
        this.seasonsCount = seasonsCount
        this.backdropUrl = ""
    }

    /**
     * Returns true if all episodes have the flag watched === true.
     *
     * @returns {boolean} true if everything is watched, false if not
     * @memberof SeriesModel
     */
    public isWatched(): boolean {
        let result = true
        this.seasons.forEach(season => {
            if (!season.isWatched()) {
                result = false
                return
            }
        })
        return result
    }

    public averageDuration() {
        if (Array.isArray(this.episodeDuration) && this.episodeDuration.length > 0) {
            return this.episodeDuration.reduce((p, n) => p + n, 0) / this.episodeDuration.length
        }
        return 0
    }

    public totalMinutesNotWatched() {
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
}