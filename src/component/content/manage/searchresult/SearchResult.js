import React, { Component } from 'react'
import PropTypes from 'prop-types';

import SeriesapiService from '@service/api/Moviedb';
import UserRepository from '@service/user/UserRepository';
import SeriesRepository from '@service/series/SeriesRepository'

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
	
	render() {
		const series = this.props.series;

		const actions = () => {
			if (this.state.processing) {
				return;
			}
			if (this.state.hasSeries) {
				return (
					<div className="actions">
						<button onClick={ this.addSeries }>update</button>
						<button onClick={ this.removeSeries }>remove</button>
					</div>
				);
			}
			return (<button onClick={ this.addSeries }>add</button>);
		}

		return (
			<div>
				Name: { series.name }
				-- Has: { this.state.hasSeries ? 'true' : 'false' }
				{ actions() }
	  		</div>
		)
	}
}

SearchResult.propTypes = {
	series: PropTypes.object.isRequired
}