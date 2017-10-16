import React, { Component } from 'react'
import PropTypes from 'prop-types';
import UserRepository from '@service/user/UserRepository';

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

		this.ur = UserRepository;
		
		this.state = {
			series: null,
		};

		this.toggleEpisode = this.toggleEpisode.bind(this);
		this.toggleSeason = this.toggleSeason.bind(this);
	}

	toggleEpisode(episode) {
		let updated = this.state.series;
		const snum = episode.season - 1;
		const epnum = episode.episode - 1;
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
}