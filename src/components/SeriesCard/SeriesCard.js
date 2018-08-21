/** React Imports */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Tooltip from "@components/Tooltip"

import "./SeriesCard.css"
import { Series } from "@model/Series";
import TimeUtil from "@service/TimeUtil";

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

	/**
	 *
	 *
	 * @param {*} series
	 * @returns
	 * @memberof SeriesCard
	 */
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
		/** @type {Series} */
		const series = this.props.series;

		return (
			<div className="card">
				{this.props.bannerLink ?
					<Link className="banner-wrapper" to={this.props.bannerLink}>
						<div className="image-overlay" />
						<img src={this.getImageSrc(series)} alt="" />
					</Link>
					:
					<img src={this.getImageSrc(series)} alt="" />
				}
				<div className="card-title-wrapper">
					<Tooltip text={`Noch ca. ${TimeUtil.minutesToReadableTimeString(series.totalMinutesNotWatched())}`}>
						<div className="card-title">{series.name}</div>
					</Tooltip>
				</div>
				{this.props.children}
			</div>
		)
	}
}


SeriesCard.propTypes = {
	/** @type {Series} */
	series: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.element
	]),
	bannerLink: PropTypes.string
}