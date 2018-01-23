import React, { Component } from 'react'
import EventBus from '@service/EventBus/EventBus'
import Skeleton from '@scenes/skeleton/Skeleton'
import './Statistic.css';

/**
 * Component Class of Statistic.
 *
 * @export
 * @class Statistic
 * @extends {Component}
 */
export default class Statistic extends Component {

	/**
	 * Creates an instance of Statistic.
	 * @memberof Statistic
	 */
	constructor() {
		super()

		this.state = {
			totalTime: 0,
			noduration: []
		}

		EventBus.instance.emit("getAllSeries").then(val => this.calcSeries(val))
	}

	calcSeries(seriesArray) {
		let tempTotalDuration = 0
		const tempNoDuration = []

		seriesArray.forEach(series => {
			let durationAverage = 0

			if (!series.episodeDuration) {
				tempNoDuration.push(series)
				return
			}
			series.episodeDuration.forEach(singleDuration => {
				durationAverage += singleDuration
			})

			durationAverage /= series.episodeDuration.length

			if (!series.seasons) {
				return
			}

			series.seasons.forEach(season => {
				if (!season.episodes) {
					return
				}

				season.episodes.forEach((episode) => {
					if (episode.watched) {
						tempTotalDuration += durationAverage
					}
				})
			})
		})

		this.setState({
			totalTime: tempTotalDuration,
			noduration: tempNoDuration
		})
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Statistic
	 */
	render() {
		return (
			<Skeleton>
				<div>Gesamtzeit: {parseInt(this.state.totalTime, 10)} Minuten</div><br />
				Das sind: <br />
				{parseInt(this.state.totalTime / 60, 10)} Stunden, oder<br />
				{parseFloat(this.state.totalTime / 60 / 24).toFixed(2)} Tage, oder<br />
				{parseFloat(this.state.totalTime / 60 / 24 / 30).toFixed(2)} Monate, oder<br />
				{parseFloat(this.state.totalTime / 60 / 24 / 30 / 12).toFixed(2)} Jahre<br />
				{(this.state.noduration.length !== 0 ? <div>Diese Serien haben keine Episodenlänge in der Datenbank hinterlegt und können deswegen nicht berücksichtigt werden:</div> : '')}
				{
					this.state.noduration.map(val => {
						return <a key={val.id} href={`https://www.themoviedb.org/tv/${val.id}`} target="_blank">{val.name}</a>
					})
				}
				{(this.state.noduration.length !== 0 ? <div>Wenn du sie dort updatest und dann neu lädst wird es funktionieren.</div> : '')}
			</Skeleton>
		)
	}
}