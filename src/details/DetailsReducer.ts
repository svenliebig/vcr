import { ActionType, getType } from "typesafe-actions"
import DetailsActions from "./DetailsAction"
import SeriesModel from "vcr-shared/models/SeriesModel"

export type DetailsActionsType = ActionType<typeof DetailsActions>

export interface DetailsState {
    readonly series: SeriesModel | null
    readonly selectedSeason: number
}

const initialState = (): DetailsState => ({
    series: null,
    selectedSeason: 0
})

const DetailsReducer = (state = initialState(), action: DetailsActionsType): DetailsState => {
    switch (action.type) {
        case getType(DetailsActions.loadSeries):
            return { ...state }
        case getType(DetailsActions.loadSeriesComplete):
            console.debug(action.payload)
            return { ...state, series: action.payload }
        case getType(DetailsActions.changeSeason):
            return { ...state, selectedSeason: action.payload }
        default:
            return state
    }
}

export default DetailsReducer