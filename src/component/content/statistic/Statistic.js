import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import UserRepository from '@service/user/UserRepository';

import moment from 'moment';

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
		super();

		this.ur = new UserRepository();
		
		this.state = {
			totalTime: 0
		};

		this.calcSeries = this.calcSeries.bind(this);
		
		this.ur.getAllSeries().then(val => this.calcSeries(val));
	}

	/**
	 * Called after the constructor.
	 * 
	 * @memberof Statistic
	 */
	componentDidMount() {
	}

	calcSeries(seriesArray) {
		let tempTotalDuration = 0;
		
		seriesArray.forEach(series => {
			let durationAverage = 0;

			series.episodeDuration.forEach(singleDuration => {
				durationAverage += singleDuration;
			});

			durationAverage /= series.episodeDuration.length;

			series.seasons.forEach(season => {
				if (!season.episodes)
					return

				season.episodes.forEach((episode) => {
					if (episode.watched)
						tempTotalDuration += durationAverage;
				});
			});
		});

		this.setState({
			totalTime: tempTotalDuration
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
				<div>Gesamtzeit: { parseInt(this.state.totalTime) } Minuten</div><br />
				Das sind: <br />
				{ parseInt(this.state.totalTime / 60) } Stunden, oder<br />
				{ parseFloat(this.state.totalTime / 60 / 24).toFixed(2) } Tage, oder<br />
				{ parseFloat(this.state.totalTime / 60 / 24 / 30).toFixed(2) } Monate, oder<br />
				{ parseFloat(this.state.totalTime / 60 / 24 / 30 / 12).toFixed(2) } Jahre<br />
			</Skeleton>
		)
	}
}