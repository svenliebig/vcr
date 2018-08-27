import EpisodeModel from "@model/EpisodeModel"
import SeasonModel from "@model/SeasonModel"
import SeriesModel from "@model/SeriesModel"
import EventBus from "@service/EventBus/EventBus"

export default class SeriesHandler {
    public static toggleEpisode(series: SeriesModel, episode: EpisodeModel): SeriesModel {
        if (episode.isAired()) {
            const updated = series
            const snum = episode.season - 1
            const epnum = episode.episode - 1
            updated.seasons[snum].episodes[epnum].watched = !updated.seasons[snum].episodes[epnum].watched

            EventBus.instance.emit("updateWatchedSeries", updated)
        }
        return series
    }

    public static toggleSeries(series: SeriesModel): SeriesModel {
        let changed = false

        series.seasons.forEach(season => {
            if (!season.episodes) {
                return
            }
            season.episodes.forEach(episode => {
                if (episode.isAired()) {
                    if (!episode.watched) {
                        changed = true
                    }
                    episode.watched = true
                }
            })
        })

        if (!changed) {
            series.seasons.forEach(season => {
                if (!season.episodes) {
                    return
                }
                season.episodes.forEach(episode => {
                    episode.watched = false
                })
            })
        }

        EventBus.instance.emit("updateWatchedSeries", series)

        return series
    }

    public static toggleSeason(series: SeriesModel, season: SeasonModel): SeriesModel {
        const snum = season.seasonNumber - 1
        let changed = false

        series.seasons[snum].episodes.forEach(episode => {
            if (episode.isAired()) {
                if (!episode.watched) {
                    changed = true
                }
                episode.watched = true
            }
        })

        if (!changed) {
            series.seasons[snum].episodes.forEach(episode => {
                episode.watched = false
            })
        }

        EventBus.instance.emit("updateWatchedSeries", series)

        return series
    }
}