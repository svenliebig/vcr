import React, { Component } from 'react'
import UserRepository from '@service/user/UserRepository';

import Skeleton from '@component/Skeleton';

import './View.css';

export default class View extends Component {

	constructor(props) {
		super();
		this.ur = UserRepository;

		this.state = {
			series: null,
		}

		let self = this;

		// TODO
		// Checken ob der nutzer die Serie hat, falls nicht lade die 
		// Series aus dem SeriesRepository, falls doch lade sie vom Nutzer
		// Und zeige gleichzeitig an ob er schon was gesehen hat etc.

		this.ur.getSeries(props.match.params.id, (series) => {
			self.setState({
				series: series
			});
		});
		
		this.getImageSrc = this.getImageSrc.bind(this);
	}

	componentDidMount() {
	}
	
	getImageSrc() {
		const url = this.state.series.posterUrl;
		if (url.endsWith('jpg')) {
			return url.replace('w300', 'w1000');
		} else {
			return 'bright-squares.53c1ec5f96d716d4265e.png';
		}
	}

  	render() {
		let self = this;

		const mapEpisode = (episode) => {
			return(
				<div>
					{ episode.name } <br />
					{ episode.overview } <br />
					{ episode.watched ? 'gesehen' : 'nicht' }
				</div>
			);
		}

		const mapSeason = (season) => {
			return(
				<div>
					{season.name}
					<div className="episodes-wrapper">
						{ season.episodes.map(mapEpisode) }
					</div>
				</div>
			);
		}

		const mapGenres = (genre) => {
			return(
				<div className="genre-wrapper">
					{ genre.name }
				</div>
			);
		}

		const renderSeries = () => {
			if (self.state.series != null) {

				return (
					<div>
						{ self.state.series.name }<br />
						{ self.state.series.overview }<br />
						{ self.state.series.genres.map(mapGenres) }<br />
						<img src={ self.getImageSrc() } alt="" />
						{ self.state.series.seasons.map(mapSeason) }
					</div>
				);
			}
		}

		return (
			<Skeleton>
				{ renderSeries() }
			</Skeleton>
		)
  }
}
