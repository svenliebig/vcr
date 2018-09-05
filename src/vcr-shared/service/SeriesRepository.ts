import FirebaseDatabase from "../service/FirebaseDatabase"
import SeriesConverter from "../converter/SeriesConverter"
import SeriesModel from "../models/SeriesModel"
import SeriesLinkModel from "../models/SeriesLinkModel"
import SeriesLinkConverter from "../converter/SeriesLinkConverter"

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

    public getSeriesLinks(id: number): Promise<Array<SeriesLinkModel>> {
        return this.firebase.get(`/series/${id}`)
            .then(val => {
                if (val) {
                    return SeriesLinkConverter.firebaseArrayToModelArray(val)
                }
                // TODO Load normal links and save as new links
            })
    }

    /**
     * Add a series to the database.
     *
     * @param {Series} series
     */
    addSeries(series: SeriesModel) {
        if (series === null || !series.id) {
            throw Promise.reject("series or VALUE is not defined.")
        }

        return this.getLinksOfSeries(series.id).then((links) => {
            if (links) {
                (series as any).links = links
            }
            return this.firebase.write(`/series/${series.id}`, series)
        })
    }

    /**
     * removes the series with the given id from the /series database
     *
     * @param {number} id
     * @returns {Promise<>}
     */
    removeSeries(id: number) {
        return this.firebase.remove(`/series/${id}`)
    }

    /**
     * Saves a specific link to a series.
     *
     * @param {number} id series id
     * @param {string} link link type
     * @param {string} val the url of the link
     */
    saveLinkToSeries(id: number, type: string, val: any) {
        return this.firebase.write(`/series/${id}/links/${type}`, val)
    }

    /**
     * Returns all links that are save on a series within a promise.
     *
     * @param {*} id Id of the series
     */
    getLinksOfSeries(id: number) {
        return this.firebase.get(`/series/${id}/links`).then(val => Promise.resolve(val))
    }

    exception(str: string) {
        return {
            message: str,
            toString: () => str
        }
    }
}