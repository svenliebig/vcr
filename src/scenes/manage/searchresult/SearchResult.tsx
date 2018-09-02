import { SeriesByNameSeriesResponse } from "vcr-shared/service/Moviedb"
import EventBus from "@service/EventBus/EventBus"
import React, { Component, Fragment, ReactNode } from "react"
import { Link } from "react-router-dom"
import "./SearchResult.less"
import TimeUtil from "@service/TimeUtil"
import Button from "@components/button/Button"

export interface Props {
    series: SeriesByNameSeriesResponse
}

export interface State {
    hasSeries: boolean
    processing: boolean
}

export default class SearchResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            hasSeries: false,
            processing: false
        }

        this.addSeries = this.addSeries.bind(this)
        this.removeSeries = this.removeSeries.bind(this)
    }

    componentWillMount() {
        EventBus.instance.emit("hasSeries", this.props.series.id).then((hasSeries: boolean) => this.setState({ hasSeries }))
    }

    addSeries() {
        this.setState({ processing: true })
        EventBus.instance.emit("addSeries", this.props.series.id).then(() => {
            this.setState({ hasSeries: true, processing: false })
        })
    }

    removeSeries() {
        this.setState({ processing: true })
        EventBus.instance.emit("removeSeries", this.props.series.id).then(() => {
            this.setState({ hasSeries: false, processing: false })
        })
    }

    getImageSrc(series: SeriesByNameSeriesResponse) {
        const url = series.backdrop_path
        if (url !== null && url.endsWith("jpg")) {
            return `https://image.tmdb.org/t/p/w300${url}`
        } else {
            return "bright-squares.png"
        }
    }

    render() {
        const { series } = this.props

        return (
            <div className="series-result">
                <img src={this.getImageSrc(series)} alt="" />
                <div className="series-title-wrapper">
                    <div className="series-title">{series.name}</div>
                </div>
                <div className="airing">{TimeUtil.formatDateString(series.first_air_date)}</div>
                <div className="actions">
                    {this.actions}
                </div>
                <div className="series-description">{series.overview}</div>
            </div>
        )
    }

    private get actions(): ReactNode {
        if (this.state.processing) {
            return null
        }
        if (this.state.hasSeries) {
            return <Fragment>
                <Button onClick={this.addSeries} icon="fa fa-refresh" />
                <Button onClick={this.removeSeries} icon="fa fa-trash" />
                <Link to={`/view/${this.props.series.id}`}><span className="fa fa-tv" /></Link>
            </Fragment>
        }
        return <Button onClick={this.addSeries} icon="fa fa-plus" />
    }
}