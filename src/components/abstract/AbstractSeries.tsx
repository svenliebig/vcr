import SeriesModel from "vcr-shared/models/SeriesModel"
import { Component } from "react"

const POSTER_URL = "https://image.tmdb.org/t/p/w300"

export interface State {
    series: SeriesModel | null
}

/**
 * Component Class of AbstractSeries.
 *
 * @export
 * @class AbstractSeries
 * @extends {Component}
 */
export default abstract class AbstractSeries<P, S extends State = State> extends Component<P, S> {
    protected getImageSrc(series: SeriesModel, width = 300) {
        if (!series) {
            return ""
        }

        const url = `${POSTER_URL}${series.backdropUrl}`
        if (url.endsWith("jpg")) {
            return url.replace(`w300`, `w${width}`)
        } else {
            return "/bright-squares.png"
        }
    }
}