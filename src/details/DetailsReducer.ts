import { ActionType, getType } from "typesafe-actions"
import DetailsActions from "./DetailsAction"
import SeriesModel from "vcr-shared/models/SeriesModel"
import SeriesLinkModel, { SeriesLinkTypes } from "vcr-shared/models/SeriesLinkModel"

export type DetailsActionsType = ActionType<typeof DetailsActions>

export interface DetailsState {
    readonly series: SeriesModel | null
    readonly selectedSeason: number
    readonly seriesLinks: { [T in SeriesLinkTypes]: SeriesLinkModel }
}

const initialState = (): DetailsState => ({
    series: null,
    selectedSeason: 0,
    seriesLinks: {
        amazonprime: new SeriesLinkModel("system", SeriesLinkTypes.AmazonPrime, ""),
        burningseries: new SeriesLinkModel("system", SeriesLinkTypes.BurningSeries, ""),
        crunchyroll: new SeriesLinkModel("system", SeriesLinkTypes.Crunchyroll, ""),
        netflix: new SeriesLinkModel("system", SeriesLinkTypes.Netflix, "")
    }
})

const DetailsReducer = (state = initialState(), action: DetailsActionsType): DetailsState => {
    switch (action.type) {
        case getType(DetailsActions.loadSeries):
            return { ...state }
        case getType(DetailsActions.resetState):
            return { ...initialState() }
        case getType(DetailsActions.loadSeriesComplete):
            return { ...state, series: action.payload }
        case getType(DetailsActions.loadLinksComplete):
            return { ...state, seriesLinks: { ...state.seriesLinks, ...action.payload } }
        case getType(DetailsActions.changeSeason):
            return { ...state, selectedSeason: action.payload }
        case getType(DetailsActions.changeLink):
            return { ...state, seriesLinks: { ...state.seriesLinks, [action.payload.type]: action.payload } }
        default:
            return state
    }
}

export default DetailsReducer