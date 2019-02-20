import SeriesConverter from "../converter/SeriesConverter"
import SeriesLinkModel, { SeriesLinkTypes } from "../models/SeriesLinkModel"
import SeriesModel from "../models/SeriesModel"
import FirebaseDatabase from "../service/FirebaseDatabase"

/**
 * Repository to communicate with the /series node in the database.
 *
 * @export
 * @class SeriesRepository
 */
export default class SeriesRepository {
    constructor(private firebase: FirebaseDatabase) { }

    /**
     * returns the series that matches the given id.
     *
     * @param {number} id id of a series
     */
    public getSeries(id: number | string): Promise<SeriesModel> {
        if (id === null || id === "") {
            return Promise.reject(null)
        }

        return this.firebase.get(`/series/${id}`).then(val => Promise.resolve(val && SeriesConverter.firebaseToModel(val)))
    }

    public saveSeriesLinks(id: number, links: Array<SeriesLinkModel>): Promise<void> {
        return this.firebase.write(`/series/${id}`, links)
    }

    public async getSeriesLinks(id: number): Promise<{ [T in SeriesLinkTypes]: SeriesLinkModel }> {
        return this.firebase.get(`/series-links/${id}`)
    }

    public saveSeriesLink(id: number, seriesLink: SeriesLinkModel) {
        return this.firebase.write(`/series-links/${id}/${seriesLink.type}`, seriesLink)
    }

    /**
     * Add a series to the database.
     *
     * @param {Series} series
     */
    public addSeries(series: SeriesModel): Promise<void> {
        if (series === null || !series.id) {
            throw ("series or VALUE is not defined.")
        }
        return this.firebase.write(`/series/${series.id}`, series)
    }

    /**
     * removes the series with the given id from the /series database
     *
     * @param {number} id
     * @returns {Promise<>}
     */
    public removeSeries(id: number): Promise<void> {
        return this.firebase.remove(`/series/${id}`)
    }

    /**
     * Saves a specific link to a series.
     *
     * @param {number} id series id
     * @param {string} link link type
     * @param {string} val the url of the link
     * @deprecated
     */
    saveLinkToSeries(id: number, type: string, val: any) {
        return this.firebase.write(`/series/${id}/links/${type}`, val)
    }

    /**
     * Returns all links that are save on a series within a promise.
     *
     * @param {*} id Id of the series
     * @deprecated use getSeriesLinks in future
     */
    getLinksOfSeries(id: number) {
        return this.getSeriesLinks(id)
    }

    exception(str: string) {
        return {
            message: str,
            toString: () => str
        }
    }
}