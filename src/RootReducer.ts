import { combineReducers } from "redux"
import { StateType } from "typesafe-actions/dist/types"
import DetailsReducer from "@details/DetailsReducer"

const rootReducer = combineReducers({
    DetailsReducer
})

export default rootReducer

export type RootState = StateType<typeof rootReducer>