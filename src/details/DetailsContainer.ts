import { loadSeries, loadSeriesComplete, changeSeason } from "@details/DetailsAction"
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux"
import { Dispatch } from "redux"
import { RootState } from "RootReducer"
import UserRepository from "vcr-shared/service/UserRepository"
import DetailsView, { DispatchProps, StateProps, OwnProps } from "./DetailsView"
import { EpisodeModel, SeriesModel, SeriesConverter, SeasonModel } from "vcr-shared"
import Store from "../Store"
import { Routes } from "../Router"
import SeriesHandler from "@service/SeriesHandler"

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = (state: RootState): StateProps => ({
    series: state.DetailsReducer.series,
    selectedSeason: state.DetailsReducer.selectedSeason
})

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, OwnProps> = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    loadSeries: (id: number) => {
        dispatch(loadSeries())
        UserRepository.instance.getSeries(id).then(series => {
            if (series) {
                dispatch(loadSeriesComplete(series))
            }
        })
    },
    changeSeason: (seasonNumber: number) => {
        dispatch(changeSeason(seasonNumber))
    },
    toggleEpisode: (episodeObject: EpisodeModel) => {
        if (episodeObject.isAired()) {
            const { series } = Store.getState().DetailsReducer

            if (series) {
                const updated = SeriesConverter.firebaseToModel(series)
                const snum = episodeObject.season - 1
                const epnum = episodeObject.episode - 1
                updated.seasons[snum].episodes[epnum].watched = !updated.seasons[snum].episodes[epnum].watched
                UserRepository.instance.updateWatchedSeries(updated)
                    .then(() => dispatch(loadSeriesComplete(updated)))
            }
        }
    },
    toggleSeason: (season: SeasonModel) => {
        const { series } = Store.getState().DetailsReducer
        SeriesHandler.toggleSeasonNew(series, season)
            .then(updated => dispatch(loadSeriesComplete(updated)))
    },
    delete: (series: SeriesModel) => {
        UserRepository.instance.removeSeries(series.id)
            .then(() => ownProps.history.push(Routes.Board))
    }
})

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(DetailsView)