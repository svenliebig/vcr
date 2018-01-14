/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SeriesCard.css'

/**
 * Component Class of SeriesCard.
 *
 * @export
 * @class SeriesCard
 * @extends {Component}
 */
export default class SeriesCard extends Component {

	/**
	 * Creates an instance of SeriesCard.
	 * @memberof SeriesCard
	 */
	constructor(props) {
		super()

		this.state = {
			props
		}
	}

	componentDidMount() {
		// this.setState({})
	}

	getImageSrc(series) {
		const url = series.posterUrl;
		if (url !== undefined && url.endsWith('jpg')) {
			return `https://image.tmdb.org/t/p/w300${url}`;
		} else {
			return 'bright-squares.png';
		}
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof SeriesCard
	 */
	render() {
		const series = this.props.series;

		return (
			<div className="card">
				<img src={ this.getImageSrc(series) } alt="" />
				<div className="card-title-wrapper">
					<div className="card-title">{ series.name }</div>
				</div>
	  		</div>
		)
	}
}

SeriesCard.propTypes = {
	series: PropTypes.object.isRequired
}