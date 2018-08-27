/**
 * represents an episode of a series
 *
 * @export
 * @class EpisodeModel
 */
export default class EpisodeModel {
    /**
     * the name of the episode
     *
     * @type {string}
     * @memberof EpisodeModel
     */
    public name: string

    /**
     * the airdate of the episode
     *
     * @type {string}
     * @memberof EpisodeModel
     *
     * @example
     * "2015-1-15"
     */
    public airDate: string

    /**
     * the number of the season
     *
     * @type {number}
     * @memberof EpisodeModel
     */
    public season: number

    /**
     * the number of the episode
     *
     * @type {number}
     * @memberof EpisodeModel
     */
    public episode: number

    /**
     * when true, the episode is watched
     *
     * @type {boolean}
     * @memberof EpisodeModel
     */
    public watched: boolean

    /**
     * creates an instance of EpisodeModel
     *
     * @param {string} [name=""]
     * @param {string} [airdate=""]
     * @param {number} [season=0]
     * @param {number} [episode=0]
     * @param {boolean} [watched=false]
     * @memberof EpisodeModel
     */
    constructor(name: string = "", airdate: string = "", season: number = 0, episode: number = 0, watched: boolean = false) {
        this.name = name
        this.airDate = airdate
        this.season = season
        this.episode = episode
        this.watched = watched
    }

    public isNotAired() {
        const dateArray = this.airDate.split("-").map(e => parseInt(e, 10))
        const releaseDate = new Date(dateArray[0], dateArray[1], dateArray[2])
        return releaseDate > new Date()
    }

    public isAired() {
        return !this.isNotAired()
    }

    /**
     * Returns if the series is aired and not watched.
     */
    public isNotWatchedAndAired() {
        return !this.watched && this.isAired()
    }

    public isWatchedOrNotAired() {
        return this.isWatched() || this.isNotAired()
    }

    public isWatchedAndAired() {
        return this.watched && this.isAired()
    }

    public isWatched() {
        return this.watched
    }

    public isNotWatched() {
        return !this.watched
    }
}