import React, { Component } from 'react'
import PropTypes from 'prop-types';
import UserRepository from '@service/user/UserRepository';
import moment from 'moment';

import './Series.css';

export default class Series extends Component {
	constructor(props) {
		super();
		this.ur = UserRepository;

		this.state = {
			activeSeason: 0,
			series: props.series
		}

		this.getImageSrc = this.getImageSrc.bind(this);
		this.getActiveSeason = this.getActiveSeason.bind(this);
		this.incrementActiveSeason = this.incrementActiveSeason.bind(this);
		this.decrementActiveSeason = this.decrementActiveSeason.bind(this);
		this.toggleEpisode = this.toggleEpisode.bind(this);
		this.toggleSeason = this.toggleSeason.bind(this);
		this.seasonScroll = this.seasonScroll.bind(this);
	}

	componentDidMount() {
		this.setState({
			activeSeason: this.getActiveSeason(),
			series: this.props.series
		});
	}

	getActiveSeason() {
		let activeSeason = 1;

		if (this.state.series) {
			this.state.series.seasons.some(season => {
				return season.episodes.some(episode => {
					activeSeason = season.seasonNumber;
					return !episode.watched;
				});
			});
		}

		return activeSeason;
	}

	getImageSrc() {
		const url = this.props.series.posterUrl;
		if (url.endsWith('jpg')) {
			return url;
		} else {
			return 'bright-squares.53c1ec5f96d716d4265e.png';
		}
	}

	decrementActiveSeason() {
		if (this.state.activeSeason > 1) {
			this.setState({
				activeSeason: this.state.activeSeason - 1
			});
		}
	}
	
	incrementActiveSeason() {
		if (this.state.activeSeason < (this.state.series.seasons.length)) {
			this.setState({
				activeSeason: this.state.activeSeason + 1
			});
		}
	}

	getSeasonClass(num) {
		if (num === this.state.activeSeason) {
			return 'active';
		} else if (num - 1 === this.state.activeSeason) {
			return 'preactive';
		} else if (num + 1 === this.state.activeSeason) {
			return 'preactive';
		} else {
			return '';
		}
	}

	isAirDateAfterToday(episode) {
		return moment(episode.airDate).isAfter();
	}

	createEpisodeTooltip(episode) {
		if(this.isAirDateAfterToday(episode)) {
			return `S${episode.season}E${episode.episode} kommt am ` + moment(episode.airDate).format('DD.MM.YYYY');
		} else {
			return `S${episode.season}E${episode.episode} - ${episode.name}`;
		}
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

	seasonScroll(event) {
		if (event.deltaY > 0) {
			this.incrementActiveSeason();
		} else {
			this.decrementActiveSeason();
		}
	}
	
	render() {
		const createEpisodes = (episode, index) => {
			return(
				<div key={ index } className="episode-container">
					<button 
						className={ this.isAirDateAfterToday(episode) ? ('fa fa-clock-o') : (episode.watched ? 'fa fa-check-square-o' : 'fa fa-square-o') } 
						title={ this.createEpisodeTooltip(episode) }
						onClick={ this.toggleEpisode.bind(this, episode) }>
					</button>
				</div>
			);
		}

		const createSeasons = (season, index) => {
			return(
				<div key={ index } className={ 'season ' + this.getSeasonClass(season.seasonNumber) }>
					<div className="season-title">{ 'Staffel ' + season.seasonNumber }</div>
					<div className="episodes-wrapper" season={ season.seasonNumber }>
						{ season.episodes.map(createEpisodes) }
						<button 
							className="fa fa-eye"
							title="Alle Folgen dieser Staffel als gesehen markieren."
							onClick={ this.toggleSeason.bind(this, season) }>
						</button>
					</div>
				</div>
			);
		};

		const seasonMap = () => {
			return (
				<div className="seasons-wrapper">
					<div className="season-container" onWheel={ this.seasonScroll }>
						{ this.state.series.seasons.map(createSeasons) }
					</div>
					<div className="season-navigation">
						<button onClick={ this.decrementActiveSeason }>
							<span className="fa fa-arrow-up"></span>
						</button>
						<button onClick={ this.incrementActiveSeason }>
							<span className="fa fa-arrow-down"></span>
						</button>
					</div>
				</div>
			)
		};

		return (
			<div className="series-card-wrapper">
				<div className="series-card-container">
					<div className="banner-wrapper">
						<img src={ this.getImageSrc() } alt="" />
						<div className="image-overlay"/>
					</div>
					<div className="title-wrapper">
						{ this.state.series.name }
					</div>
					{ seasonMap() }
				</div>
			</div>
		)
	}
}

Series.propTypes = {
	series: PropTypes.object.isRequired
}