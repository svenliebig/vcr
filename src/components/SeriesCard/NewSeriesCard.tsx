/** React Imports */
import ServiceFactory from "@utils/ServiceFactory"
import React, { Component, ReactNode } from "react"
import SeriesModel from "vcr-shared/models/SeriesModel"
import "./SeriesCard.less"

export interface Props {
    series: SeriesModel | string | number
    children?: ReactNode
}

export interface State {
    series: SeriesModel | null
}

/**
 * Component Class of SeriesCard.
 *
 * @export
 * @class SeriesCard
 * @extends {Component}
 */
export default class SeriesCard extends Component<Props, State> {
    private series = ServiceFactory.series
    public state: State  = {
        series: null
    }

    constructor(props: Props) {
        super(props)

        const { series } = props

        if (typeof series === "string" || typeof series === "number") {
            this.series.getSeries(series as any)
                .then(userSeries => {
                    this.setState({ series: userSeries })
                })
        } else {
            this.setState({ series })
        }
    }

    render() {
        const { series } = this.state
        const { children } = this.props
        if (series) {
            return <div className="message-card">
                <img src={this.getImageSrc(series)} alt={series.name} width="100%" />
                <div className="title-wrapper">
                    <h4 className="my-0">{series.name}</h4>
                </div>
                {children}
            </div>
        }
        return <div className="card" />
    }

    private getImageSrc(series: SeriesModel) {
        const url = series.backdropUrl
        if (url !== undefined && url.endsWith("jpg")) {
            return `https://image.tmdb.org/t/p/w400${url}`
        } else {
            return "bright-squares.png"
        }
    }
}