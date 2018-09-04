import { ActionType, getType } from "typesafe-actions"
import DetailsActions from "./DetailsAction"
import SeriesModel from "vcr-shared/models/SeriesModel"

export type DetailsActionsType = ActionType<typeof DetailsActions>

export interface DetailsState {
    readonly series: SeriesModel | null
}

const initialState = (): DetailsState => ({
    series: null
})

const DetailsReducer = (state = initialState(), action: DetailsActionsType): DetailsState => {
    switch (action.type) {
        case getType(DetailsActions.loadSeries):
            return { ...state }
        case getType(DetailsActions.loadSeriesComplete):
            return { ...state, series: action.payload }
        default:
            return state
    }
}

export default DetailsReducer