import { createAction } from "typesafe-actions"
import SeriesModel from "vcr-shared/models/SeriesModel"

export enum DetailsAction {
    LoadSeries = "DetailsAction/LoadSeries",
    LoadSeriesComplete = "DetailsAction/LoadSeriesComplete"
}

export const loadSeries = createAction(DetailsAction.LoadSeries)

export const loadSeriesComplete = createAction(DetailsAction.LoadSeriesComplete, resolve => {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return (series: SeriesModel) => resolve(series)
})

const DetailsActions = {
    loadSeries, loadSeriesComplete
}

export default DetailsActions