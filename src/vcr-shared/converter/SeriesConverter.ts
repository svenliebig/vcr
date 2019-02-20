import { SeriesResponse } from "../service/Moviedb"
import SeriesModel from "../models/SeriesModel"
import SeasonConverter from "../converter/SeasonConverter"
import { SeriesFirebase } from "../service/FirebaseTypes"
import SeriesPriority from "../models/SeriesPriority"

/**
 * has functions to convert or merge different episode models
 *
 * @export
 * @class SeriesConverter
 */
export default class SeriesConverter {

    /**
     * converts an [SeasonReponse](#SeasonReponse) to an [SeriesModel](#SeriesModel)
     *
     * @static
     * @param {SeriesResponse} response
     * @returns
     * @memberof SeriesConverter
     */
    public static responseToModel(response: SeriesResponse): SeriesModel {
        const series = new SeriesModel(response.id)
        series.name = response.name
        series.overview = response.overview
        series.airDate = response.first_air_date
        series.posterUrl = response.poster_path || ""
        series.backdropUrl = response.backdrop_path || ""
        series.rating = response.vote_average
        series.votes = response.vote_count
        series.genres = []

        if (response.genres) {
            response.genres.forEach(val => series.genres.push(val.name))
        }

        series.country = response.origin_country
        series.status = response.status
        series.createdBy = response.created_by
        series.episodeDuration = response.episode_run_time
        series.seasonsCount = response.number_of_seasons
        return series
    }

    static firebaseArrayToModelArray(obj: { [key: string]: SeriesFirebase }) {
        const result: Array<SeriesModel> = []
        for (const key in obj) {
            result.push(SeriesConverter.firebaseToModel(obj[key]))
        }
        return result
    }

    public static firebaseToModel(firebase: SeriesFirebase): SeriesModel {
        const series = new SeriesModel()

        if (!firebase) {
            return series
        }

        series.id = firebase.id
        series.name = firebase.name
        series.overview = firebase.overview
        series.airDate = firebase.airDate
        series.posterUrl = firebase.posterUrl || ""
        series.backdropUrl = firebase.backdropUrl || ""
        series.rating = firebase.rating
        series.votes = firebase.votes
        series.genres = firebase.genres || []
        series.country = firebase.country || []
        series.status = firebase.status
        series.createdBy = firebase.createdBy || []
        series.episodeDuration = firebase.episodeDuration || []
        series.seasons = firebase.seasons ? firebase.seasons.map(SeasonConverter.firebaseToModel) : []
        series.seasonsCount = firebase.seasonsCount || (firebase.seasons && firebase.seasons.length) || 0
        series.isCompletlyWatched = firebase.isCompletlyWatched || false
        series.priority = firebase.priority === undefined ? SeriesPriority.Medium : firebase.priority
        return series
    }

    public static mergeModels(...seriesArray: Array<SeriesModel>): SeriesModel {
        return seriesArray.reduce((previous, next) => {
            const result = new SeriesModel()

            if (!previous && !next) {
                return result
            }

            if (!previous) {
                return SeriesConverter.mergeModels(result, next)
            }

            if (!next) {
                return SeriesConverter.mergeModels(result, previous)
            }

            result.id = next.id || previous.id
            result.name = next.name || previous.name
            result.overview = next.overview || previous.overview
            result.airDate = next.airDate || previous.airDate
            result.posterUrl = previous.posterUrl || next.posterUrl
            result.backdropUrl = previous.backdropUrl || next.backdropUrl
            result.rating = next.rating || previous.rating
            result.seasonsCount = next.seasonsCount || previous.seasonsCount
            result.votes = next.votes || previous.votes
            result.genres = Array.isArray(next.genres) && next.genres.length > 0 ? next.genres : previous.genres
            result.country = Array.isArray(next.country) && next.country.length > 0 ? next.country : previous.country
            result.status = next.status || previous.status
            result.isCompletlyWatched = next.isCompletlyWatched
            result.createdBy = Array.isArray(next.createdBy) && next.createdBy.length > 0 ? next.createdBy : previous.createdBy
            result.episodeDuration = Array.isArray(next.episodeDuration) && next.episodeDuration.length > 0 ? next.episodeDuration : previous.episodeDuration
            result.priority = previous.priority

            if (Array.isArray(next.seasons) && next.seasons.length > (previous.seasons ? previous.seasons.length : 0)) {
                result.seasons = next.seasons.map((nextEpisode, index) => {
                    if (!previous.seasons || index >= previous.seasons.length) {
                        return nextEpisode
                    }
                    return SeasonConverter.mergeModels(previous.seasons[index], nextEpisode)
                })
            } else if (previous.seasons) {
                result.seasons = previous.seasons.map((previousEpisode, index) => {
                    if (!next.seasons || index >= next.seasons.length) {
                        return previousEpisode
                    }
                    return SeasonConverter.mergeModels(next.seasons[index], previousEpisode)
                })
            } else {
                result.seasons = []
            }

            return result
        })
    }
}