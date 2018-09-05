import EpisodeModel from "vcr-shared/models/EpisodeModel"
import SeasonModel from "vcr-shared/models/SeasonModel"
import SeriesModel from "vcr-shared/models/SeriesModel"
import EventBus from "@service/EventBus/EventBus"
import { SeriesConverter } from "vcr-shared"
import ServiceFactory from "@utils/ServiceFactory"

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

    public static toggleSeasonNew(toUpdate: SeriesModel | null, season: SeasonModel): Promise<SeriesModel> {
        if (!toUpdate) {
            return Promise.reject("nothing to update, SeriesModel is null")
        }

        const series = SeriesConverter.firebaseToModel(toUpdate)

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

        return ServiceFactory.user.updateWatchedSeries(series)
            .then(() => series)
    }
}