/** React Imports */
import Tooltip from "@components/Tooltip"
import SeriesModel from "vcr-shared/models/SeriesModel"
import TimeUtil from "@service/TimeUtil"
import React, { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import "./SeriesCard.less"

export interface Props {
    bannerLink?: string
    series: SeriesModel
    children?: ReactNode
}

/**
 * Component Class of SeriesCard.
 *
 * @export
 * @class SeriesCard
 * @extends {Component}
 */
export default class SeriesCard extends Component<Props> {
    constructor(props: Props) {
        super(props)

        this.state = {
            props
        }
    }

    render() {
        const { series } = this.props
        const remainingWatchtime = series.totalMinutesNotWatched()

        return (
            <div className="card">
                {this.props.bannerLink ?
                    <Link className="banner-wrapper" to={this.props.bannerLink}>
                        <div className="image-overlay" />
                        <img src={this.getImageSrc(series)} alt="" />
                    </Link>
                    :
                    <img src={this.getImageSrc(series)} alt="" />
                }
                <div className="card-title-wrapper">
                    <Tooltip text={remainingWatchtime === 0 ? "Vollständig gesehen" : `Noch ca. ${TimeUtil.minutesToReadableTimeString(remainingWatchtime)}`}>
                        <div className="card-title">{series.name}</div>
                    </Tooltip>
                </div>
                {this.props.children}
            </div>
        )
    }

    /**
	 *
	 *
	 * @param {*} series
	 * @returns
	 * @memberof SeriesCard
	 */
    private getImageSrc(series: SeriesModel) {
        const url = series.backdropUrl
        if (url !== undefined && url.endsWith("jpg")) {
            return `https://image.tmdb.org/t/p/w300${url}`
        } else {
            return "bright-squares.png"
        }
    }
}