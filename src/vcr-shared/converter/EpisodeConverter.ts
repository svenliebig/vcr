import EpisodeModel from "../models/EpisodeModel"
import { SeasonEpisodeResponse } from "../service/Moviedb"
import { EpisodeFirebase } from "../service/FirebaseTypes"

/**
 * has functions to convert or merge different episode models
 *
 * @export
 * @class EpisodeConverter
 */
export default class EpisodeConverter {

    /**
     * converts an [SeasonEpisodeResponse](#SeasonEpisodeResponse) to an [EpisodeModel](#EpisodeModel)
     *
     * @static
     * @param {SeasonEpisodeResponse} response
     * @returns
     * @memberof EpisodeConverter
     */
    public static responseToModel(response: SeasonEpisodeResponse): EpisodeModel {
        const {
            name,
            air_date,
            season_number,
            episode_number
        } = response
        return new EpisodeModel(name, air_date, season_number, episode_number)
    }

    public static firebaseToModel(firebase: EpisodeFirebase): EpisodeModel {
        const {
            name,
            airDate,
            season,
            episode,
            watched
        } = firebase
        return new EpisodeModel(name, airDate, season, episode, watched)
    }

    public static mergeModels(...episodes: Array<EpisodeModel>): EpisodeModel {
        return episodes.reduce((previous, next) => {
            const result = new EpisodeModel()

            if (!previous && !next) {
                return result
            }

            if (!previous) {
                return EpisodeConverter.mergeModels(result, next)
            }

            if (!next) {
                return EpisodeConverter.mergeModels(result, previous)
            }

            result.name = next.name || previous.name
            result.airDate = next.airDate || previous.airDate
            result.season = next.season || previous.season
            result.episode = next.episode || previous.episode
            result.watched = next.watched || previous.watched

            return result
        })
    }
}