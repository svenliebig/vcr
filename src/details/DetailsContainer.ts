import { changeSeason, loadSeries, loadSeriesComplete, loadLinksComplete, changeLink, resetState } from "@details/DetailsAction"
import SeriesHandler from "@service/SeriesHandler"
import ServiceFactory from "@utils/ServiceFactory"
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux"
import { Dispatch } from "redux"
import { RootState } from "RootReducer"
import { EpisodeModel, SeasonModel, SeriesConverter, SeriesModel } from "vcr-shared"
import SeriesLinkModel, { SeriesLinkTypes } from "vcr-shared/models/SeriesLinkModel"
import UserRepository from "vcr-shared/service/UserRepository"
import { Routes } from "../Router"
import Store from "../Store"
import DetailsView, { DispatchProps, OwnProps, StateProps, } from "./DetailsView"

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = (state: RootState): StateProps => ({
    series: state.DetailsReducer.series,
    selectedSeason: state.DetailsReducer.selectedSeason,
    seriesLinks: state.DetailsReducer.seriesLinks
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
    loadLinks: (id: number) => {
        ServiceFactory.series.getSeriesLinks(id).then(links => dispatch(loadLinksComplete(links)))
    },
    changeSeason: (seasonNumber: number) => {
        dispatch(changeSeason(seasonNumber))
    },
    resetState: () => {
        dispatch(resetState())
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
    },
    handleSharedLinkInput: (type: SeriesLinkTypes, value: string) => {
        const { series } = Store.getState().DetailsReducer
        if (series) {
            ServiceFactory.user.getName()
                .then((name) => {
                    const seriesLink = new SeriesLinkModel(name, type, value)
                    dispatch(changeLink(seriesLink))
                    ServiceFactory.series.saveSeriesLink(series.id, seriesLink)
                })
        }
    }
})

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(DetailsView)