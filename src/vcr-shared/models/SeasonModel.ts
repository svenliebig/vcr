import EpisodeModel from "./EpisodeModel"

/**
 * Represents a series season.
 *
 * @export
 * @class Season
 */
export default class SeasonModel {
    public seasonNumber: number
    public episodes: Array<EpisodeModel>
    public episodeAmount: number

    /**
     * Creates an instance of Season.
     *
     * @param {string} [name=''] Name of the season.
     * @param {string} [overview=''] Description of this season.
     * @param {number} [seasonNumber=0] Number of this season.
     * @param {Array<EpisodeModel>} [episodes=new Array<Episode>()] Array of episodes that are in this season.
     * @param {number} [episodeAmount=0] Number of total episodes of this season.
     * @memberof Season
     */
    constructor(seasonNumber: number = 0, episodes: Array<EpisodeModel> = [], episodeAmount: number = 0) {
        this.seasonNumber = seasonNumber
        this.episodes = episodes
        this.episodeAmount = episodeAmount
    }

    public isNotWatchedAndAired() {
        if (this.episodeAmount === 0) {
            return false
        }

        return this.episodes.some(episode => episode.isNotWatchedAndAired())
    }

    public isWatched() {
        if (this.episodeAmount === 0) {
            return true
        }

        return !this.episodes.some(episode => episode.isNotWatched())
    }
}