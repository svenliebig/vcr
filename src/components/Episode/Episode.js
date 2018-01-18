/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

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
			return `S${this.props.episode.season}E${this.props.episode.episode} kommt am ` + moment(this.props.episode.airDate).format('DD.MM.YYYY');
		} else {
			return `S${this.props.episode.season}E${this.props.episode.episode} - ${this.props.episode.name} vom ${moment(this.props.episode.airDate).format('DD.MM.YYYY')}`;
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
				<button
					className={ this.icon }
					title={this.tooltip }
					onClick={ this.props.onClick }>
				</button>
			</div>
		)
	}
}

Episode.propTypes = {
	episode: PropTypes.any.isRequired,
	onClick: PropTypes.func
}