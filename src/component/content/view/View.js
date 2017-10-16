import React from 'react'
import SeriesRepository from '@service/series/SeriesRepository';

import Skeleton from '@component/Skeleton';
import AbstractSeries from '@component/abstract/AbstractSeries';

import './View.css';

export default class View extends AbstractSeries {

	constructor(props) {
		super();
		this.sr = new SeriesRepository();

		this.state = {
			series: null,
			bstolink: "",
			changed: false
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

		this.handleBurningSeriesInput = this.handleBurningSeriesInput.bind(this);
		this.savePreferences = this.savePreferences.bind(this);
	}

	componentDidMount() {
	}

	handleBurningSeriesInput(e) {
		this.setState({
			bstolink: e.target.value,
			changed: true
		});
	}

	savePreferences() {
		// series repository

		this.setState({
			changed: false
		});
	}

  	render() {
		let self = this;

		const buildEpisodeNumber = (episode) => {
			const episodeNumber = episode.episode < 10 ? `0${episode.episode}` : `${episode.episode}`;
			const seasonNumber = episode.season < 10 ? `0${episode.season}` : `${episode.season}`;
			return `S${seasonNumber}E${episodeNumber}`;
		}

		const mapEpisode = (episode) => {
			return(
				<tr key={ episode.episode }>
					<td>
						<button onClick={ this.toggleEpisode.bind(this, episode) }>
							<span className={ 'fa ' + (episode.watched ? 'fa-check-square-o' : 'fa-square-o') }></span>
						</button>
					</td>
					<td>
						{ buildEpisodeNumber(episode) }
					</td>
					<td>
						{ episode.name }
					</td>
					<td>
						{ this.dateFormat(episode.airDate) }
					</td>
				</tr>
			);
		}

		const mapSeason = (season) => {
			return(
				<table key={ season.seasonNumber } className="season-wrapper">
					<thead>
						<tr>
							<th></th>
							<th colSpan="3">
								{season.name}
							</th>
						</tr>
					</thead>
					<tbody className="episodes-wrapper">
						{ season.episodes.map(mapEpisode) }
					</tbody>
				</table>
			);
		}

		const mapGenres = (genre) => {
			return(
				<div key={ genre.id } className="genre-badge">
					{ genre.name }
				</div>
			);
		}

		const renderSeries = () => {
			if (self.state.series != null) {

				return (
					<div className="series-container">
						<div className="series-header">
							<img src={ self.getImageSrc() } alt="" />
							<div className="series-name-wrapper">
								<div className="series-name">
									{ self.state.series.name }
								</div>
							</div>
							<div className="genre-wrapper">
								{ self.state.series.genres.map(mapGenres) }
							</div>
						</div>
						<div className="series-actions">
							<div className="input-container">
								<label>bs.to</label>
								<input type="type" value={ this.state.bstolink } onChange={ this.handleBurningSeriesInput } />
							</div>
							<div className="spacer"></div>
							{ this.state.changed ? <button className="save" onClick={ this.savePreferences }>Speichern</button> : '' }
						</div>
						<div className="series-content">
							{ self.state.series.overview }<br />
							{ self.state.series.seasons.map(mapSeason) }
						</div>
					</div>
				);
			}
		}

		return (
			<Skeleton>
				<div className="view-series-wrapper">
					{ renderSeries() }
				</div>
			</Skeleton>
		)
  }
}
