import { createAction } from "typesafe-actions"
import SeriesModel from "vcr-shared/models/SeriesModel"

export enum DetailsAction {
    LoadSeries = "DetailsAction/LoadSeries",
    LoadSeriesComplete = "DetailsAction/LoadSeriesComplete",
    ChangeSeason = "DetailsAction/ChangeSeason"
}

export const loadSeries = createAction(DetailsAction.LoadSeries)

export const loadSeriesComplete = createAction(DetailsAction.LoadSeriesComplete, resolve => {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return (series: SeriesModel) => resolve(series)
})

export const changeSeason = createAction(DetailsAction.ChangeSeason, resolve => {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return (seasonNumber: number) => resolve(seasonNumber)
})

const DetailsActions = {
    loadSeries, loadSeriesComplete, changeSeason
}

export default DetailsActions