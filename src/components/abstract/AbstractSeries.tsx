import SeriesModel from "@model/SeriesModel"
import moment from "moment"
import { Component } from "react"

const POSTER_URL = "https://image.tmdb.org/t/p/w300"

export interface State {
    series: SeriesModel | null
}

/**
 * Component Class of AbstractSeries.
 *
 * @export
 * @class AbstractSeries
 * @extends {Component}
 */
export default abstract class AbstractSeries<P, S extends State = State> extends Component<P, S> {
    /**
     *
     * @param {EpisodeModel} episode
     * @param {number} index
     */
    // protected toggleEpisode = (episode: EpisodeModel) => {
    //     this.setState({
    //         series: SeriesHandler.toggleEpisode(this.state.series, episode)
    //     })
    // }

    // protected isAirDateAfterToday(episode: EpisodeModel) {
    //     return moment(episode.airDate).isAfter()
    // }

    // protected toggleSeason = (series: SeriesModel, season: SeasonModel) => {
    //     if (!series) {
    //         return
    //     }

    //     const updated = series
    //     const snum = season.seasonNumber - 1
    //     let changed = false

    //     updated.seasons[snum].episodes.forEach(episode => {
    //         if (episode.isAired()) {
    //             if (!episode.watched) {
    //                 changed = true
    //             }
    //             episode.watched = true
    //         }
    //     })

    //     if (!changed) {
    //         updated.seasons[snum].episodes.forEach(episode => {
    //             episode.watched = false
    //         })
    //     }

    //     EventBus.instance.emit("updateWatchedSeries", updated)

    //     this.setState({
    //         series: updated
    //     })
    // }

    // protected toggleSeries(series: SeriesModel) {
    //     if (!series) {
    //         return
    //     }

    //     const updated = series
    //     let changed = false
    //     updated.seasons.forEach(season => {
    //         if (!season.episodes) {
    //             return
    //         }
    //         season.episodes.forEach(episode => {
    //             if (moment(episode.airDate).isBefore()) {
    //                 if (!episode.watched) {
    //                     changed = true
    //                 }
    //                 episode.watched = true
    //             }
    //         })
    //     })

    //     if (!changed) {
    //         updated.seasons.forEach(season => {
    //             if (!season.episodes) {
    //                 return
    //             }
    //             season.episodes.forEach(episode => {
    //                 episode.watched = false
    //             })
    //         })
    //     }

    //     EventBus.instance.emit("updateWatchedSeries", updated)
    //     this.setState({
    //         series: updated
    //     })
    // }

    protected getImageSrc(series: SeriesModel, width = 300) {
        if (!series) {
            return ""
        }

        const url = `${POSTER_URL}${series.posterUrl}`
        if (url.endsWith("jpg")) {
            return url.replace(`w300`, `w${width}`)
        } else {
            return "/bright-squares.png"
        }
    }

    protected dateFormat(date: string): string {
        return moment(date).format("DD.MM.YYYY")
    }
}