import React from "react"
import PropTypes from "prop-types"

// Service
import EventBus from "@service/EventBus/EventBus"

// Model
import { Series as SeriesModel } from "@model/Series"

// Components
import AbstractSeries from "@components/abstract/AbstractSeries"
import SeriesCard from "@components/SeriesCard"
import Episode from "@components/Episode"
import Tooltip from "@components/Tooltip"

// CSS
import "./Series.css"

/**
 * Represents a Series.
 */
export default class Series extends AbstractSeries {

	/**
	 *
	 * @param {{ series: SeriesModel }} props
	 */
	constructor(props) {
		super(props)

		this.state = {
			activeSeason: 0,
			series: props.series,
			bsto: "",
			otaku: ""
		}

		this.getActiveSeason = this.getActiveSeason.bind(this);
		this.incrementActiveSeason = this.incrementActiveSeason.bind(this);
		this.decrementActiveSeason = this.decrementActiveSeason.bind(this);
		this.createSeriesLink = this.createSeriesLink.bind(this);
		this.seasonScroll = this.seasonScroll.bind(this);
	}

	componentDidMount() {
		EventBus.instance.emit("getLinksOfSeries", this.props.series.id).then(links => {
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
		let activeSeason = 1;

		if (this.state.series) {
			this.state.series.seasons.some(season => {
				if (season.episodes !== undefined) {
					return season.episodes.some(episode => {
						activeSeason = season.seasonNumber
						return !episode.watched
					})
				}
			})
		}

		return activeSeason;
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

	getSeasonClass(num) {
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

	seasonScroll(event) {
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
		const createEpisodes = (episode, index) => {
			return <Episode key={index} episode={episode} onClick={this.toggleEpisode.bind(this, episode, index)} />
		}

		/**
		 *
		 * @param {Season} season
		 * @param {number} index
		 */
		const createSeasonToggle = (season) => {
			let render = true;

			if (season.episodes === undefined) {
				return ""
			}

			render = !season.episodes.some(episode => !episode.isAired())

			if (render) {
				return (
					<Tooltip text="Alle Folgen dieser Staffel als gesehen markieren">
						<button className="fa fa-eye" onClick={this.toggleSeason.bind(this, season)} />
					</Tooltip>
				)
			}
		}

		/**
		 *
		 * @param {Season} season
		 * @param {number} index
		 */
		const createSeasons = (season, index) => {
			return (
				<div key={index} className={"season " + this.getSeasonClass(season.seasonNumber)}>
					{createSeasonToggle(season)}
					<div className="season-title">{"Staffel " + season.seasonNumber}</div>
					<div className="episodes-wrapper" season={season.seasonNumber}>
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
							onClick={this.toggleSeries}
						/>
					</Tooltip>
					{seasonMap()}
				</SeriesCard>
			</div>
		)
	}
}

Series.propTypes = {
	series: PropTypes.instanceOf(SeriesModel).isRequired
}