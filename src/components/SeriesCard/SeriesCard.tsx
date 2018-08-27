/** React Imports */
import Tooltip from "@components/Tooltip"
import SeriesModel from "@model/SeriesModel"
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

    /**
	 *
	 *
	 * @param {*} series
	 * @returns
	 * @memberof SeriesCard
	 */
    getImageSrc(series: SeriesModel) {
        const url = series.posterUrl
        if (url !== undefined && url.endsWith("jpg")) {
            return `https://image.tmdb.org/t/p/w300${url}`
        } else {
            return "bright-squares.png"
        }
    }

    render() {
        const { series } = this.props

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
                    <Tooltip text={`Noch ca. ${TimeUtil.minutesToReadableTimeString(series.totalMinutesNotWatched())}`}>
                        <div className="card-title">{series.name}</div>
                    </Tooltip>
                </div>
                {this.props.children}
            </div>
        )
    }
}