import React, { Component } from 'react'
import PropTypes from 'prop-types';

import SeriesapiService from '@service/api/Moviedb';
import UserRepository from '@service/user/UserRepository';
import SeriesRepository from '@service/series/SeriesRepository'

import moment from 'moment';

import './SearchResult.css';

export default class SearchResult extends Component {
	constructor() {
		super();
		this.ur = UserRepository;
		this.sapi = new SeriesapiService();
		this.sr = SeriesRepository;

		this.state = {
			hasSeries: false,
			processing: false
		}

		this.addSeries = this.addSeries.bind(this);
		this.removeSeries = this.removeSeries.bind(this);
	}

	componentDidMount() {
		let self = this;
		this.ur.hasSeries(this.props.series.id, (val) => {
			self.setState({
				hasSeries: val
			})
		})
	}

	addSeries() {
		let self = this;
		self.setState({
			processing: true
		});
		this.sapi.getCompleteSeries(this.props.series.id, (series) => {
			self.ur.addSeries(series);
			self.sr.addSeries(series);
			self.setState({
				hasSeries: true,
				processing: false
			});
		});
	}

	removeSeries() {
		let self = this;
		self.setState({
			processing: true
		});
		this.ur.removeSeries(this.props.series.id, () => {
			self.setState({
				hasSeries: false,
				processing: false
			});
		});
	}

	getImageSrc(series) {
		const url = series.backdrop_path;
		if (url !== null && url.endsWith('jpg')) {
			return `https://image.tmdb.org/t/p/w300${url}`;
		} else {
			return 'bright-squares.png';
		}
	}
	
	render() {
		const series = this.props.series;
		
		const actions = () => {
			if (this.state.processing) {
				return;
			}
			if (this.state.hasSeries) {
				return (
					<div>
						<button onClick={ this.addSeries }><span className="fa fa-refresh"></span></button>
						<button onClick={ this.removeSeries }><span className="fa fa-trash"></span></button>
					</div>
				);
			}
			return (<button onClick={ this.addSeries }><span className="fa fa-plus"></span></button>);
		}

		return (
			<div className="series-result">
				<img src={ this.getImageSrc(series) } alt="" />
				<div className="series-title">{ series.name }</div>
				<div className="series-description">{ series.overview }</div>
				<div className="airing">{ moment(series.first_air_date).format('DD.MM.YYYY') }</div>
				<div className="actions">
					{ actions() }
				</div>
	  		</div>
		)
	}
}

SearchResult.propTypes = {
	series: PropTypes.object.isRequired
}