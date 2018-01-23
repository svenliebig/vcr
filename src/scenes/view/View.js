import React from 'react'
import { Link } from "react-router-dom"

import Skeleton from '@scenes/skeleton/Skeleton'

/** Services */
import Message from '@service/Message'

/** Components */
import { Tabs, Tab } from '@components/tabs'
import AbstractSeries from '@components/abstract/AbstractSeries'
import ButtonRemove from '@components/button/remove/ButtonRemove'
import Mail from '@components/button/Mail'


import './View.css';
import EventBus from '@service/EventBus/EventBus';

export default class View extends AbstractSeries {

	constructor(props) {
		super()
		this.msg = new Message()

		this.state = {
			series: null,
			changed: false,
			bsto: '',
			otaku: '',
			suggestedUsername: ""
		}

		this.handleInput = this.handleInput.bind(this)
		this.savePreferences = this.savePreferences.bind(this)
		this.removeSeries = this.removeSeries.bind(this)

		EventBus.instance.emit("getSeries", props.match.params.id).then(series => this.setState({ series }))
		EventBus.instance.emit("getLinksOfSeries", props.match.params.id).then(links => {
			links && this.setState({
				otaku: links.otaku || '',
				bsto: links.bsto || (this.state.bsto || '')
			})
		})
	}

	removeSeries() {
		EventBus.instance.emit("removeSeries", this.props.match.params.id).then(() => {
			window.location.pathname = "/"
		})
	}

	suggestSeries() {
		EventBus.instance.emit("getName").then(val => this.msg.writeMessage(this.props.match.params.id, val, this.state.suggestedUsername))
	}

	handleInput(e) {
		switch (e.target.id) {
			case "otaku":
				this.setState({
					otaku: e.target.value,
					changed: true
				})
				break
			case "bsto":
				this.setState({
					bsto: e.target.value,
					changed: true
				})
				break
			case "username":
				this.setState({
					suggestedUsername: e.target.value
				})
				break
		}
	}

	savePreferences() {
		const links = {
			bsto: this.state.bsto,
			otaku: this.state.otaku
		}
		EventBus.instance.emit("saveLinkToSeries", this.state.series.id, '', links).then(() => {
			this.setState({
				changed: false
			})
		})
	}

	render() {
		let self = this;

		const buildEpisodeNumber = (episode) => {
			const episodeNumber = episode.episode < 10 ? `0${episode.episode}` : `${episode.episode}`;
			const seasonNumber = episode.season < 10 ? `0${episode.season}` : `${episode.season}`;
			return `S${seasonNumber}E${episodeNumber}`;
		}

		const mapEpisode = (episode, index) => {
			return (
				<tr key={episode.episode}>
					<td>
						<button onClick={this.toggleEpisode.bind(this, episode, index)}>
							<span className={this.isAirDateAfterToday(episode) ? ('fa fa-clock-o') : (episode.watched ? 'fa fa-check-square-o' : 'fa fa-square-o')}></span>
						</button>
					</td>
					<td>
						{buildEpisodeNumber(episode)}
					</td>
					<td>
						{episode.name}
					</td>
					<td>
						{this.dateFormat(episode.airDate)}
					</td>
				</tr>
			);
		}

		const mapSeason = (season, index) => {
			return (
				<Tab key={season.seasonNumber} title={`Staffel ${index + 1}`}>
					<table key={season.seasonNumber} className="season-wrapper">
						<thead>
							<tr>
								<th>
									<button
										className="fa fa-eye"
										onClick={this.toggleSeason.bind(this, season)}>
									</button>
								</th>
							</tr>
						</thead>
						<tbody className="episodes-wrapper">
							{season.episodes ? season.episodes.map(mapEpisode) : ''}
						</tbody>
					</table>
				</Tab>
			);
		}

		const mapGenres = (genre, index) => {
			return (
				<div key={index} className="genre-badge">
					{genre}
				</div>
			)
		}

		const renderSeries = () => {
			const series = this.state.series
			const { genres, name, seasons } = series

			return (
				<div className="series-container">
					<div className="series-header">
						<img src={this.getImageSrc(500)} alt="" />
						<Link className="series-header--link" to="/">
							<span className="fa fa-arrow-left fa-2x"></span>
						</Link>
						<div className="series-name-wrapper">
							<div className="series-name">
								{name}
							</div>
						</div>
						<div className="genre-wrapper">
							{genres && genres.map(mapGenres)}
						</div>
					</div>
					<div className="series-actions">
						<div className="head">
							<div className="input-wrapper">
								<div className="input-container">
									<label>bs.to</label>
									<input id="bsto" type="type" placeholder="https://bs.to/example" value={this.state.bsto} onChange={this.handleInput} />
									<label>otakustream</label>
									<input id="otaku" type="type" placeholder="https://otakustream.tv/anime/xyz/" value={this.state.otaku} onChange={this.handleInput} />
									<label>empfehlen</label>
									<input id="username" placeholder="Name" onChange={this.handleInput} />
								</div>
							</div>
							<div className="action-wrapper">
								<Mail onClick={this.suggestSeries.bind(this)} />
							</div>
							<div className="action-wrapper">
								<ButtonRemove onClick={this.removeSeries} />
							</div>
						</div>
						<div className="spacer"></div>
						{this.state.changed ? <button className="save" onClick={this.savePreferences}>Speichern</button> : ''}
					</div>
					<div className="series-content">
						<div className="series-content--description">
							{self.state.series.overview}
						</div>
						<Tabs defaultActiveTabIndex={0}>
							{seasons && seasons.map(mapSeason)}
						</Tabs>
					</div>
				</div>
			)
		}

		return (
			<Skeleton>
				<div className="view-series-wrapper">
					{(this.state.series) ? renderSeries() : ""}
				</div>
			</Skeleton>
		)
	}
}
