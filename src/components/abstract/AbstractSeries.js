import { Component } from 'react'
import UserRepository from '@service/user/UserRepository';

import moment from 'moment';

const POSTER_URL = 'https://image.tmdb.org/t/p/w300';

/**
 * Component Class of AbstractSeries.
 *
 * @export
 * @class AbstractSeries
 * @extends {Component}
 */
export default class AbstractSeries extends Component {

	/**
	 * Creates an instance of AbstractSeries.
	 * @memberof AbstractSeries
	 */
	constructor() {
		super();

		this.ur = new UserRepository();

		this.state = {
			series: null
		};

		this.toggleEpisode = this.toggleEpisode.bind(this)
		this.toggleSeason = this.toggleSeason.bind(this)
		this.getImageSrc = this.getImageSrc.bind(this)
		this.toggleSeries = this.toggleSeries.bind(this)
	}

	toggleEpisode(episode, index) {
		let updated = this.state.series;
		const snum = episode.season - 1;
		const epnum = index ? index : episode.episode - 1;
		updated.seasons[snum].episodes[epnum].watched = !updated.seasons[snum].episodes[epnum].watched;
		this.ur.updateWatchedSeries(updated);
		this.setState({
			series: updated
		});
	}

	toggleSeason(season) {
		let updated = this.state.series;
		const snum = season.seasonNumber - 1;
		let changed = false;
		updated.seasons[snum].episodes.forEach(episode => {
			if(!episode.watched) {
				changed = true;
			}
			episode.watched = true;
		});

		if (!changed) {
			updated.seasons[snum].episodes.forEach(episode => {
				episode.watched = false;
			});
		}

		this.ur.updateWatchedSeries(updated);
		this.setState({
			series: updated
		});
	}

	toggleSeries() {
		let updated = this.state.series;
		let changed = false;
		updated.seasons.forEach(season => {
			if (!season.episodes) {
				return
			}
			season.episodes.forEach(episode => {
				if(!episode.watched) {
					changed = true;
				}
				episode.watched = true;
			});
		});

		if (!changed) {
			updated.seasons.forEach(season => {
				if (!season.episodes) {
					return
				}
				season.episodes.forEach(episode => {
					episode.watched = false;
				});
			});
		}

		this.ur.updateWatchedSeries(updated);
		this.setState({
			series: updated
		});
	}

	getImageSrc(width = 300) {
		const url = `${POSTER_URL}${this.state.series.posterUrl}`;
		if (url.endsWith('jpg')) {
			return url.replace(`w300`, `w${width}`);
		} else {
			return 'bright-squares.53c1ec5f96d716d4265e.png';
		}
	}

	dateFormat(date) {
		return moment(date).format("DD.MM.YYYY");
	}
}