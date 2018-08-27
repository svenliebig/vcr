import { SeriesByNameSeriesResponse } from "@service/api/Moviedb"
import EventBus from "@service/EventBus/EventBus"
import moment from "moment"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./SearchResult.less"

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

    componentDidMount() {
        EventBus.instance.emit("hasSeries", this.props.series.id).then((val: boolean) => {
            this.setState({
                hasSeries: val
            })
        })
    }

    addSeries() {
        this.setState({
            processing: true
        })
        EventBus.instance.emit("addSeries", this.props.series.id).then(() => {
            this.setState({
                hasSeries: true,
                processing: false
            })
        })
    }

    removeSeries() {
        const self = this
        self.setState({
            processing: true
        })
        EventBus.instance.emit("removeSeries", this.props.series.id).then(() => {
            self.setState({
                hasSeries: false,
                processing: false
            })
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
        const series = this.props.series

        const actions = () => {
            if (this.state.processing) {
                return
            }
            if (this.state.hasSeries) {
                return (
                    <div>
                        <button onClick={this.addSeries}><span className="fa fa-refresh" /></button>
                        <button onClick={this.removeSeries}><span className="fa fa-trash" /></button>
                        <Link className="view-link" to={`/view/${series.id}`}><span className="fa fa-tv"></span></Link>
                    </div>
                )
            }
            return (<button onClick={this.addSeries}><span className="fa fa-plus"></span></button>)
        }

        return (
            <div className="series-result">
                <img src={this.getImageSrc(series)} alt="" />
                <div className="series-title-wrapper">
                    <div className="series-title">{series.name}</div>
                </div>
                <div className="airing">{moment(series.first_air_date).format("DD.MM.YYYY")}</div>
                <div className="actions">
                    {actions()}
                </div>
                <div className="series-description">{series.overview}</div>
            </div>
        )
    }
}