/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import Tooltip from "@components/Tooltip"

import './Episode.css'

/**
 * Component Class of Episode.
 *
 * @export
 * @class Episode
 * @extends {Component}
 */
export default class Episode extends Component {

	get aired() {
		return moment(this.props.episode.airDate).isAfter();
	}

	get tooltip() {
		if(this.aired) {
			return `S${this.season}E${this.episode} kommt am ` + this.airDate;
		} else {
			return `S${this.season}E${this.episode} - ${this.props.episode.name} vom ${this.airDate}`;
		}
	}

	get airDate() {
		return moment(this.props.episode.airDate).format('DD.MM.YYYY')
	}

	get season() {
		if (parseInt(this.props.episode.season) > 9) {
			return this.props.episode.season
		} else {
			return `0${this.props.episode.season}`
		}
	}

	get episode() {
		if (parseInt(this.props.episode.episode) > 9) {
			return this.props.episode.episode
		} else {
			return `0${this.props.episode.episode}`
		}
	}

	get icon() {
		return this.aired ? ('fa fa-clock-o') : (this.props.episode.watched ? 'fa fa-check-square-o' : 'fa fa-square-o')
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Episode
	 */
	render() {
		return (
			<div className="episode-container">
				<Tooltip text={ this.tooltip }>
					<button
						className={ this.icon }
						title={this.tooltip }
						onClick={ this.props.onClick }>
					</button>
				</Tooltip>
			</div>
		)
	}
}

Episode.propTypes = {
	episode: PropTypes.any.isRequired,
	onClick: PropTypes.func
}