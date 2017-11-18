import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import Series from '@component/content/board/series/Series';
import UserRepository from '@service/user/UserRepository';
import SeriesRepository from '@service/series/SeriesRepository';
import SeriesapiService from '@service/api/Moviedb';
import Dropdown from '@component/utils/Dropdown';

import './Board.css';


		
let selectableGenres = [{
	name: "Alle"
  }, {
	name: "Anime"
  }, {
	name: "Serien"
}]

import moment from 'moment';

export default class Board extends Component {
  constructor() {
		super();
		this.ur = new UserRepository();
		this.sr = new SeriesRepository();
		this.sapi = new SeriesapiService();

		this.state = {
			selectedFilter: selectableGenres[0],
			filterNotWatched: false,
			filterUpcoming: true,
			deprecatedArray: [],
			sortAscending: true,
			filterWatched: true,
			processing: false,
			updateIndex: 0,
			userSeries: [],
			loaded: false
		}

		this.toggleNotWatched = this.toggleNotWatched.bind(this);
		this.checkDeprecated = this.checkDeprecated.bind(this);
		this.toggleUpcoming = this.toggleUpcoming.bind(this);
		this.toggleWatched = this.toggleWatched.bind(this);
		this.filterSeries = this.filterSeries.bind(this);
		this.selectGenre = this.selectGenre.bind(this);
		this.toggleSort = this.toggleSort.bind(this);
		this.sortSeries = this.sortSeries.bind(this);
		// this.updateLoop = this.updateLoop.bind(this);
		// this.updateAll = this.updateAll.bind(this);
	}
	
	componentDidMount() {
		this.ur.getAllSeries().then(series => {
			self.setState({
				userSeries: series,
				loaded: true
			});
		});
	}

	// updateAll() {
	// 	if(this.state.userSeries.length == 0)
	// 		return

	// 	this.setState({
	// 		updateIndex: 0,
	// 		processing: true
	// 	}, () => {
	// 		this.sapi.getCompleteSeries(this.state.userSeries[this.state.updateIndex].id, this.updateLoop);
	// 	});
	// }

	// updateLoop(series) {
	// 	this.ur.addSeries(series);
	// 	this.sr.addSeries(series);

	// 	this.setState({
	// 		updateIndex: (this.state.userSeries.length > (this.state.updateIndex + 1) ? this.state.updateIndex + 1 : 0)
	// 	}, () => {
	// 		if (this.state.updateIndex != 0) {
	// 			this.sapi.getCompleteSeries(this.state.userSeries[this.state.updateIndex].id, this.updateLoop);
	// 		} else {
	// 			window.location.pathname = "/";
	// 		}
	// 	});
	// }

	// checkDeprecated() {
	// 	let self = this;
	// 	this.state.userSeries.forEach(series => {
	// 		self.sr.getSeries(series.id).then((val) => {
	// 			if(moment(series.updated, 'DD.MM.YYYY').isBefore(moment(val.updated, 'DD.MM.YYYY'))) {
	// 				let tempArray = self.state.deprecatedArray;
	// 				tempArray.push(series.name);
	// 				self.setState({
	// 					deprecatedArray: tempArray
	// 				});
	// 			}
	// 		});
	// 	})
	// }

	toggleWatched() {
		this.setState({
			filterWatched: !this.state.filterWatched
		})
	}

	toggleNotWatched() {
		this.setState({
			filterNotWatched: !this.state.filterNotWatched
		})
	}
	
	toggleUpcoming() {
		this.setState({
			filterUpcoming: !this.state.filterUpcoming
		})
	}

	toggleSort() {
		this.setState({ sortAscending: !this.state.sortAscending })
	}

	selectGenre(selected) {
		this.setState({ selectedFilter: selected });
	}

	isCompleteWatched(series) {
		let result = true;
		series.seasons.forEach(season => {
			if (season.episodeAmount != 0)
				season.episodes.forEach(episode => {
					if (!episode.watched) {
						result = false;
					}
				});
		});
		return result;
	};

	hasUpcoming(series) {
		let result = false;
		let completlyWatched = true;
		series.seasons.forEach(season => {
			if (season.episodeAmount != 0)
				season.episodes.forEach(episode => {
					if (moment(episode.airDate).isAfter()) {
						result = true;
					}
					if (!episode.watched && moment(episode.airDate).isBefore()) {
						completlyWatched = false;
					}
				});
		});
		return result && completlyWatched;
	}

	hasNotWatched(series) {
		let result = false;
		series.seasons.forEach(season => {
			if (season.episodeAmount != 0)
				season.episodes.forEach(episode => {
					if (!episode.watched && moment(episode.airDate).isBefore()) {
						result = true;
					}
				});
		});
		return result;
	};

	isAnimeGenre(series) {
		if (series.genres == null || series.country == null)
			return false;
	
		let resultGenre = false;
		let resultCountry = false;

		series.genres.forEach((genre) => {
			if (genre == "Animation") {
				resultGenre = true;
			}
		});

		series.country.forEach((country) => {
			if (country == "JP") {
				resultCountry = true;
			}
		});

		return resultGenre && resultCountry;
	}

	filterSeries(series) {
		if (this.state.selectedFilter.name == "Anime") {
			if (!this.isAnimeGenre(series)) {
				return false;
			}
		} else if (this.state.selectedFilter.name == "Serien") {
			if (this.isAnimeGenre(series)) {
				return false;
			}
		}
		if (this.state.filterWatched) {
			if (this.isCompleteWatched(series)) {
				return false;
			}
		}
		if (this.state.filterUpcoming) {
			if (this.hasUpcoming(series)) {
				return false;
			}
		}
		if (this.state.filterNotWatched) {
			if (this.hasNotWatched(series)) {
				return false;
			}
		}
		return true;
	};

	sortSeries(seriesA, seriesB) {
		if (this.state.sortAscending)
			return seriesA.name.localeCompare(seriesB.name);
		return seriesB.name.localeCompare(seriesA.name);
	}
	
	render() {
		let self = this;

		const seriesMap = this.state.userSeries.filter(this.filterSeries).sort(this.sortSeries).map((series) =>
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

		const seriesPlaceholder = () => {
			if (!this.state.loaded) {
				var placeholder = [];
				for (let x = 0; x < 9; x++) {
					placeholder.push(
						<div key={ 'placeholder-' + x } className="series-placeholder">
							<div className="image" />
							<div className="season" />
							<div className="season" />
						</div>
					)
				}
				return (
					<div>
						{ placeholder }
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
						<button className="filter-toggle" onClick={ this.toggleNotWatched }>
							<span>Offene </span>
							<span className={ this.state.filterNotWatched ? 'fa fa-toggle-on' : 'fa fa-toggle-off' }></span>
						</button>
						<button className="filter-toggle" onClick={ this.toggleUpcoming }>
							<span>Bekommt neue </span>
							<span className={ this.state.filterUpcoming ? 'fa fa-toggle-on' : 'fa fa-toggle-off' }></span>
						</button>
						<button className="toggle-sort" onClick={ this.toggleSort }>
							<span className={ this.state.sortAscending ? 'fa fa-sort-alpha-asc' : 'fa fa-sort-alpha-desc' }></span>
						</button>
						<Dropdown list={ selectableGenres } selected={ selectableGenres[0] } onclick={ this.selectGenre } />
						<div className="spacer"></div>
						<button className="updater" onClick={ this.updateAll }>
							<span>Alles updaten </span>
							<span className="fa fa-refresh"></span>
						</button>
					</div>
					<div className="series-table-content">
					{ seriesMap }
					{ seriesPlaceholder() }
					</div>
				</div>
			</Skeleton>
		)
  }
}
