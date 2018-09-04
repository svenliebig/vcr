import EpisodeConverter from "../converter/EpisodeConverter"
import SeasonModel from "../models/SeasonModel"
import { SeasonReponse } from "../service/Moviedb"
import { SeasonFirebase } from "../service/FirebaseTypes"

/**
 * has functions to convert or merge different episode models
 *
 * @export
 * @class SeasonConverter
 */
export default class SeasonConverter {

    /**
     * converts an [SeasonReponse](#SeasonReponse) to an [SeasonModel](#SeasonModel)
     *
     * @static
     * @param {SeasonEpisodeResponse} response
     * @returns
     * @memberof SeasonConverter
     */
    public static responseToModel(response: SeasonReponse): SeasonModel {
        const model = new SeasonModel()
        model.seasonNumber = response.season_number
        model.episodeAmount = response.episodes.length
        response.episodes.forEach((episode) => {
            model.episodes.push(EpisodeConverter.responseToModel(episode))
        })
        return model
    }

    public static firebaseToModel(firebase: SeasonFirebase): SeasonModel {
        const model = new SeasonModel()
        model.seasonNumber = firebase.seasonNumber
        model.episodeAmount = firebase.episodeAmount
        model.episodes = firebase.episodes ? firebase.episodes.map(EpisodeConverter.firebaseToModel) : []
        return model
    }

    public static mergeModels(...seasons: Array<SeasonModel>): SeasonModel {
        return seasons.reduce((previous, next) => {
            const result = new SeasonModel()
            if (!previous && !next) {
                return result
            }

            if (!previous) {
                return SeasonConverter.mergeModels(result, next)
            }

            if (!next) {
                return SeasonConverter.mergeModels(result, previous)
            }

            result.seasonNumber = next.seasonNumber || previous.seasonNumber
            result.episodeAmount = next.episodeAmount || previous.episodeAmount

            if (Array.isArray(next.episodes) && next.episodes.length > (previous.episodes ? previous.episodes.length : 0)) {
                result.episodes = next.episodes.map((nextEpisode, index) => {
                    if (!previous.episodes || index >= previous.episodes.length) {
                        return nextEpisode
                    }
                    return EpisodeConverter.mergeModels(previous.episodes[index], nextEpisode)
                })
            } else if (previous.episodes) {
                result.episodes = previous.episodes.map((previousEpisode, index) => {
                    if (!next.episodes || index >= next.episodes.length) {
                        return previousEpisode
                    }
                    return EpisodeConverter.mergeModels(next.episodes[index], previousEpisode)
                })
            } else {
                result.episodes = []
            }

            return result
        })
    }
}