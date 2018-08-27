import React from "react"

// Service
import EventBus from "@service/EventBus/EventBus"

// Model
import SeriesModel from "@model/SeriesModel"

// Components
import AbstractSeries, { State as AbstractSeriesState } from "@components/abstract/AbstractSeries"
import SeriesCard from "@components/SeriesCard/SeriesCard"
import Episode from "@components/Episode/Episode"
import Tooltip from "@components/Tooltip"

import EpisodeModel from "@model/EpisodeModel"
import SeasonModel from "@model/SeasonModel"
import SeriesHandler from "@service/SeriesHandler"

import "./Series.less"

export interface Props {
    series: SeriesModel
}

export interface State extends AbstractSeriesState {
    activeSeason: number
    series: SeriesModel
    bsto: string
    otaku: string
}

/**
 * Represents a Series.
 */
export default class Series extends AbstractSeries<Props, State> {

    /**
	 *
	 * @param {{ series: SeriesModel }} props
	 */
    constructor(props: Props) {
        super(props)

        this.state = {
            activeSeason: 0,
            series: props.series,
            bsto: "",
            otaku: ""
        }

        this.getActiveSeason = this.getActiveSeason.bind(this)
        this.incrementActiveSeason = this.incrementActiveSeason.bind(this)
        this.decrementActiveSeason = this.decrementActiveSeason.bind(this)
        this.createSeriesLink = this.createSeriesLink.bind(this)
        this.seasonScroll = this.seasonScroll.bind(this)
    }

    componentDidMount() {
        EventBus.instance.emit("getLinksOfSeries", this.props.series.id).then((links: { otaku: string, bsto: string }) => {
            if (links) {
                this.setState({
                    otaku: links.otaku || "",
                    bsto: links.bsto || (this.state.bsto || "")
                })
            }
        })

        this.setState({
            activeSeason: this.getActiveSeason(),
            series: this.props.series
        })
    }

    getActiveSeason() {
        let activeSeason = 1

        if (this.state.series) {
            this.state.series.seasons.some(season => {
                if (season.episodes !== undefined) {
                    return season.episodes.some(episode => {
                        activeSeason = season.seasonNumber
                        return !episode.watched
                    })
                }
                return false
            })
        }

        return activeSeason
    }

    decrementActiveSeason() {
        if (this.state.activeSeason > 1) {
            this.setState({
                activeSeason: this.state.activeSeason - 1
            })
        }
    }

    incrementActiveSeason() {
        if (this.state.activeSeason < (this.state.series.seasons.length)) {
            this.setState({
                activeSeason: this.state.activeSeason + 1
            })
        }
    }

    getSeasonClass(num: number) {
        if (num === this.state.activeSeason) {
            return "active"
        } else if (num - 1 === this.state.activeSeason) {
            return "preactive"
        } else if (num + 1 === this.state.activeSeason) {
            return "preactive"
        } else {
            return ""
        }
    }

    seasonScroll(event: React.WheelEvent<HTMLDivElement>) {
        event.preventDefault()
        if (event.deltaY > 0) {
            this.incrementActiveSeason()
        } else {
            this.decrementActiveSeason()
        }
    }

    createSeriesLink() {
        if (this.state.bsto.match(/https:\/\/bs\.to\/serie/)) {
            return `${this.state.bsto}/${this.state.activeSeason}`
        } else {
            return `${this.state.bsto}`
        }
    }

    render() {
        const createEpisodes = (episode: EpisodeModel, index: number) => {
            return <Episode key={index} episode={episode} onClick={() => this.setState({ series: SeriesHandler.toggleEpisode(this.state.series, episode) })} />
        }

        /**
		 *
		 * @param {SeasonModel} season
		 * @param {number} index
		 */
        const createSeasonToggle = (season: SeasonModel) => {
            let render = true

            if (season.episodes === undefined) {
                return ""
            }

            render = !season.episodes.some(episode => !episode.isAired())

            if (render) {
                return (
                    <Tooltip text="Alle Folgen dieser Staffel als gesehen markieren">
                        <button className="fa fa-eye" onClick={() => this.setState({ series: SeriesHandler.toggleSeason(this.state.series, season) })} />
                    </Tooltip>
                )
            }
            return ""
        }

        /**
		 *
		 * @param {SeasonModel} season
		 * @param {number} index
		 */
        const createSeasons = (season: SeasonModel, index: number) => {
            return (
                <div key={index} className={"season " + this.getSeasonClass(season.seasonNumber)}>
                    {createSeasonToggle(season)}
                    <div className="season-title">{"Staffel " + season.seasonNumber}</div>
                    <div className="episodes-wrapper" {...{ season: season.seasonNumber } as any}>
                        {(season.episodes !== undefined ? season.episodes.map(createEpisodes) : "")}
                    </div>
                </div>
            )
        }

        const seasonMap = () => {
            return (
                <div className="seasons-wrapper">
                    <div className="season-container" onWheel={this.seasonScroll}>
                        {this.state.series.seasons.map(createSeasons)}
                    </div>
                </div>
            )
        }

        return (
            <div className="series-card-wrapper">
                <SeriesCard series={this.state.series} bannerLink={`/view/${this.state.series.id}`}>
                    {
                        this.state.bsto ?
                            <a className="bs-link" href={this.createSeriesLink()} target="_blank">bs</a>
                            : ""
                    }
                    {
                        this.state.otaku ?
                            <a className="otaku-link" href={this.state.otaku} target="_blank">otk</a>
                            : ""
                    }
                    <Tooltip text="Alle Folgen der Serie als gesehen markieren">
                        <button className="fa fa-eye"
                            style={{ position: "absolute", left: 270, bottom: 11, zIndex: 9, background: "none", color: "inherit", border: "none", outline: "none", cursor: "pointer" }}
                            onClick={() => this.setState({ series: SeriesHandler.toggleSeries(this.state.series) })}
                        />
                    </Tooltip>
                    {seasonMap()}
                </SeriesCard>
            </div>
        )
    }
}