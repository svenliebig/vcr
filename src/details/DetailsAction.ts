import { createAction } from "typesafe-actions"
import SeriesModel from "vcr-shared/models/SeriesModel"
import SeriesLinkModel, { SeriesLinkTypes } from "vcr-shared/models/SeriesLinkModel"

export enum DetailsAction {
    LoadSeries = "DetailsAction/LoadSeries",
    LoadSeriesComplete = "DetailsAction/LoadSeriesComplete",
    LoadLinksComplete = "DetailsAction/LoadLinksComplete",
    ChangeLink = "DetailsAction/ChangeLink",
    ChangeSeason = "DetailsAction/ChangeSeason"
}

export const loadSeries = createAction(DetailsAction.LoadSeries)

export const loadSeriesComplete = createAction(DetailsAction.LoadSeriesComplete, resolve => {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return (series: SeriesModel) => resolve(series)
})

export const loadLinksComplete = createAction(DetailsAction.LoadLinksComplete, resolve => {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return (links: { [T in SeriesLinkTypes]: SeriesLinkModel }) => resolve(links)
})

export const changeLink = createAction(DetailsAction.ChangeLink, resolve => {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return (link: SeriesLinkModel) => resolve(link)
})

export const changeSeason = createAction(DetailsAction.ChangeSeason, resolve => {
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return (seasonNumber: number) => resolve(seasonNumber)
})

const DetailsActions = {
    loadSeries, loadSeriesComplete, changeSeason, loadLinksComplete,
    changeLink
}

export default DetailsActions