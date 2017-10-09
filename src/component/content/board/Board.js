import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import Series from '@component/content/board/series/Series';
import UserRepository from '@service/user/UserRepository';
import SeriesRepository from '@service/series/SeriesRepository';
import SeriesapiService from '@service/api/Moviedb';

import './Board.css';

import moment from 'moment';

export default class Board extends Component {
  constructor() {
		super();
		this.ur = UserRepository;
		this.sr = SeriesRepository;
		this.sapi = new SeriesapiService();

		this.state = {
			userSeries: [],
			deprecatedArray: [],
			filterWatched: true,
			updateIndex: 0,
			processing: false
		}

		this.checkDeprecated = this.checkDeprecated.bind(this);
		this.toggleWatched = this.toggleWatched.bind(this);
		this.filterSeries = this.filterSeries.bind(this);
		this.updateAll = this.updateAll.bind(this);
		this.updateLoop = this.updateLoop.bind(this);
	}

	updateAll() {
		if(this.state.userSeries.length == 0)
			return

		this.setState({
			updateIndex: 0,
			processing: true
		}, () => {
			this.sapi.getCompleteSeries(this.state.userSeries[this.state.updateIndex].id, this.updateLoop);
		});
	}

	updateLoop(series) {
		this.ur.addSeries(series);
		this.sr.addSeries(series);

		this.setState({
			updateIndex: (this.state.userSeries.length > (this.state.updateIndex + 1) ? this.state.updateIndex + 1 : 0)
		}, () => {
			if (this.state.updateIndex != 0) {
				this.sapi.getCompleteSeries(this.state.userSeries[this.state.updateIndex].id, this.updateLoop);
			} else {
				window.location.pathname = "/";
			}
		});
	}

	checkDeprecated() {
		let self = this;
		this.state.userSeries.forEach(series => {
			self.sr.getById(series.id, (val) => {
				if(moment(series.updated, 'DD.MM.YYYY').isBefore(moment(val.updated, 'DD.MM.YYYY'))) {
					let tempArray = self.state.deprecatedArray;
					tempArray.push(series.name);
					self.setState({
						deprecatedArray: tempArray
					});
				}
			});
		})
	}

	componentDidMount() {
		let self = this;
		this.ur.getAllSeries(series => {
			const tempArray = [];
			for(let key in series) { 
				tempArray.push(series[key]); 
			}
			self.setState({
				userSeries: tempArray
			});
			self.checkDeprecated();
		});
	}

	toggleWatched() {
		this.setState({
			filterWatched: !this.state.filterWatched
		})
	}

	isCompleteWatched(series) {
		let result = true;
		series.seasons.forEach(season => {
			season.episodes.forEach(episode => {
				if (!episode.watched && moment(episode.airDate).isBefore()) {
					result = false;
					return result;
				}
			});
		});
		return result;
	};

	filterSeries(series) {
		if (this.state.filterWatched) {
			if (this.isCompleteWatched(series)) {
				return false;
			}
		}
		return true;
	};
	
	render() {
		let self = this;

		const seriesMap = this.state.userSeries.filter(this.filterSeries).map((series) =>
			<div key={ series.id }>
				<Series series={ series } />
			</div> 
		);

		const updateBlocker = () => {
			if (self.state.processing) {
				return (
					<div className="updateBlocker">
						<div className="updateBlockerText">
							{ `Aktualisiere:  ${self.state.userSeries[self.state.updateIndex].name} [${self.state.updateIndex}/${self.state.userSeries.length}]` }
						</div>
					</div>
				);
			}
		}
		

		return (
			<Skeleton>
				{ updateBlocker() }
				<div className="series-table-wrapper">
					<div className="series-table-header">
						{ 
							this.state.deprecatedArray.length > 0 ? 
							<span className='fa fa-exclamation-triangle' title={ this.state.deprecatedArray.join(' ,') }></span> : '' 
						}
						<button className="filter-toggle" onClick={ this.toggleWatched }>
							<span>Gesehen </span>
							<span className={ this.state.filterWatched ? 'fa fa-toggle-on' : 'fa fa-toggle-off' }></span>
						</button>
						<button onClick={ this.updateAll }>
							<span>Alles updaten </span>
							<span className="fa fa-refresh"></span>
						</button>
					</div>
					<div className="series-table-content">
					{ seriesMap }
					</div>
				</div>
			</Skeleton>
		)
  }
}
