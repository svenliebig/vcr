import React, { Component } from 'react'
import Skeleton from '@scenes/skeleton/Skeleton';
import Series from '@scenes/board/series/Series';
import { Series as SeriesModel} from '@model/Series'
import Dropdown from '@components/dropdown';
import ButtonToggle from '@components/button/toggle/ButtonToggle'

import './Board.css';
import EventBus from '@service/EventBus/EventBus';
import Tooltip from '@components/Tooltip';

let selectableGenres = [{
	name: "Alle"
}, {
	name: "Anime"
}, {
	name: "Serien"
}]

/**
 * asdfs
 *
 * @field state {} asdf
 * @memberOf Board
 */
export default class Board extends Component {
	constructor() {
		super()

		this.state = {
			selectedFilter: selectableGenres[0],
			filterNotWatched: false,
			filterUpcoming: true,
			sortAscending: true,
			sortRemainingTime: false,
			filterWatched: true,
			userSeries: [],
			loaded: false,
			finishedLoaded: false
		}

		this.toggleNotWatched = this.toggleNotWatched.bind(this);
		this.toggleUpcoming = this.toggleUpcoming.bind(this);
		this.toggleWatched = this.toggleWatched.bind(this);
		this.filterSeries = this.filterSeries.bind(this);
		this.selectGenre = this.selectGenre.bind(this);
		this.toggleSortAlphabetical = this.toggleSortAlphabetical.bind(this);
		this.toggleSortRemainingTime = this.toggleSortRemainingTime.bind(this);
		this.sortSeries = this.sortSeries.bind(this);
	}

	componentDidMount() {
		console.time("load series")
		EventBus.instance.emit("getOpenSeries").then(series => {
			this.setState({
				userSeries: series,
				loaded: true
			}, () => {
				console.timeEnd("load series")
			})
		})
	}

	toggleWatched(filterWatched) {
		if (!this.state.finishedLoaded) {
			EventBus.instance.emit("getFinishedSeries").then(series => {
				this.setState({
					userSeries: this.state.userSeries.concat(series),
					filterWatched,
					finishedLoaded: true
				})
			})
		} else {
			this.setState({ filterWatched })
		}
	}

	toggleNotWatched(filterNotWatched) {
		this.setState({ filterNotWatched })
	}

	toggleUpcoming(filterUpcoming) {
		this.setState({ filterUpcoming })
	}

	toggleSortAlphabetical(sortAscending) {
		this.setState({ sortAscending })
	}

	toggleSortRemainingTime(sortRemainingTime) {
		console.debug(`set sort`, sortRemainingTime)
		this.setState({ sortRemainingTime })
	}

	selectGenre(selected) {
		this.setState({ selectedFilter: selected });
	}

	isCompleteWatched(series) {
		return !series.seasons.some(season => !season.isWatched())
	}

	hasUpcoming(series) {
		let result = false
		let completlyWatched = true
		series.seasons.forEach(season => {
			if (!completlyWatched) {
				return
			}
			if (season.episodeAmount !== 0) {
				season.episodes.forEach(episode => {
					if (episode.isNotAired()) {
						result = true
					}
					if (episode.isNotWatchedAndAired()) {
						completlyWatched = false
						return
					}
				})
			}
		})
		return result && completlyWatched
	}

	hasNotWatched(series) {
		return series.seasons.some(season => season.isNotWatchedAndAired())
	}

	isAnimeGenre(series) {
		if (!series.genres || !series.country) {
			return false
		}

		let resultGenre = false;
		let resultCountry = false;

		resultGenre = series.genres.some((genre) => genre === "Animation")
		resultCountry = series.country.some((country) => country === "JP")

		return resultGenre && resultCountry;
	}

	filterSeries(series) {
		if (this.state.selectedFilter.name === "Anime") {
			if (!this.isAnimeGenre(series)) {
				return false
			}
		} else if (this.state.selectedFilter.name === "Serien") {
			if (this.isAnimeGenre(series)) {
				return false
			}
		}
		if (this.state.filterWatched) {
			if (this.isCompleteWatched(series)) {
				return false
			}
		}
		if (this.state.filterUpcoming) {
			if (this.hasUpcoming(series)) {
				return false
			}
		}
		if (this.state.filterNotWatched) {
			if (this.hasNotWatched(series)) {
				return false
			}
		}
		return true
	}

	/**
	 *
	 *
	 * @param {SeriesModel} seriesA
	 * @param {SeriesModel} seriesB
	 * @returns
	 * @memberof Board
	 */
	sortSeries(seriesA, seriesB) {
		if (this.state.sortRemainingTime) {
			return seriesA.totalMinutesNotWatched() - seriesB.totalMinutesNotWatched()
		} else if (this.state.sortAscending) {
			return seriesA.name.localeCompare(seriesB.name)
		}
		return seriesB.name.localeCompare(seriesA.name);
	}

	render() {
		console.time("filter series")
		const seriesMap = this.state.userSeries.filter(this.filterSeries).sort(this.sortSeries).map((series) =>
			<div key={series.id}>
				<Series series={series} />
			</div>
		);
		console.timeEnd("filter series")

		const seriesPlaceholder = () => {
			if (!this.state.loaded) {
				var placeholder = [];
				for (let x = 0; x < 9; x++) {
					placeholder.push(
						<div key={'placeholder-' + x} className="series-placeholder">
							<div className="image" />
							<div className="season" />
							<div className="season" />
						</div>
					)
				}
				return (
					<div>
						{placeholder}
					</div>
				);
			}
		}

		return (
			<Skeleton>
				<div className="series-table-wrapper">
					<div className="series-table-header">

						<ButtonToggle text="Gesehen" className="filter-toggle" onClick={this.toggleWatched} initial={this.state.filterWatched} />
						<ButtonToggle text="Offene" className="filter-toggle" onClick={this.toggleNotWatched} initial={this.state.filterNotWatched} />
						<ButtonToggle text="Bekommt neue" className="filter-toggle" onClick={this.toggleUpcoming} initial={this.state.filterUpcoming} />
						<ButtonToggle className="toggle-sort" onClick={this.toggleSortAlphabetical} initial={this.state.sortAscending} activeIcon={`fa fa-sort-alpha-asc${this.state.sortRemainingTime ? " disabled" : ""}`} inactiveIcon={`fa fa-sort-alpha-desc${this.state.sortRemainingTime ? " disabled" : ""}`} />
						<ButtonToggle
							className="toggle-sort"
							onClick={this.toggleSortRemainingTime}
							initial={this.state.sortRemainingTime}
							activeIcon='fa fa-sort-numeric-asc text-white'
							inactiveIcon='fa fa-sort-numeric-asc'
							tooltip="Nach verbleibender Zeit nicht gesehender Folgen"
						/>

						<Dropdown list={selectableGenres} selected={selectableGenres[0]} onclick={this.selectGenre} />
						<div className="spacer"></div>
					</div>
					<div className="series-table-content">
						{seriesMap}
						{seriesPlaceholder()}
					</div>
				</div>
			</Skeleton>
		)
	}
}
