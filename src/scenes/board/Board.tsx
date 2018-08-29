import React, { Component } from "react"
import Skeleton from "@scenes/skeleton/Skeleton"
import Series from "@scenes/board/series/Series"
import Dropdown from "@components/dropdown/Dropdown"
import ButtonToggle from "@components/button/toggle/ButtonToggle"

import EventBus from "@service/EventBus/EventBus"
import SeriesModel from "@model/SeriesModel"

import "./Board.less"

const selectableGenres: Array<{ name: "Alle" | "Anime" | "Serien" }> = [{
    name: "Alle"
}, {
    name: "Anime"
}, {
    name: "Serien"
}]

export interface State {
    selectedFilter: { name: "Alle" | "Anime" | "Serien" },
    filterNotWatched: boolean
    filterUpcoming: boolean
    sortAscending: boolean
    sortRemainingTime: boolean
    filterWatched: boolean
    userSeries: Array<SeriesModel>
    loaded: boolean
    finishedLoaded: boolean
}

/**
 * asdfs
 *
 * @field state {} asdf
 * @memberOf Board
 */
export default class Board extends Component<{}, State> {
    constructor(props: {}) {
        super(props)

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

        this.toggleNotWatched = this.toggleNotWatched.bind(this)
        this.toggleUpcoming = this.toggleUpcoming.bind(this)
        this.toggleWatched = this.toggleWatched.bind(this)
        this.selectGenre = this.selectGenre.bind(this)
        this.toggleSortAlphabetical = this.toggleSortAlphabetical.bind(this)
        this.toggleSortRemainingTime = this.toggleSortRemainingTime.bind(this)

        EventBus.instance.emit("checkUser")
    }

    componentDidMount() {
        console.time("load series")
        EventBus.instance.emit("getOpenSeries").then((series: Array<SeriesModel>) => {
            this.setState({
                userSeries: series,
                loaded: true
            }, () => {
                console.timeEnd("load series")
            })
        })
    }

    toggleWatched(filterWatched: boolean) {
        if (!this.state.finishedLoaded) {
            EventBus.instance.emit("getFinishedSeries").then((series: SeriesModel) => {
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

    toggleNotWatched(filterNotWatched: boolean) {
        this.setState({ filterNotWatched })
    }

    toggleUpcoming(filterUpcoming: boolean) {
        this.setState({ filterUpcoming })
    }

    toggleSortAlphabetical(sortAscending: boolean) {
        this.setState({ sortAscending })
    }

    toggleSortRemainingTime(sortRemainingTime: boolean) {
        this.setState({ sortRemainingTime })
    }

    selectGenre(selected: { name: "Alle" | "Anime" | "Serien" }) {
        this.setState({ selectedFilter: selected })
    }

    hasUpcoming(series: SeriesModel) {
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

    seriesPlaceholder() {
        if (!this.state.loaded) {
            const placeholder: Array<React.ReactNode> = []
            for (let x = 0; x < 9; x++) {
                placeholder.push(
                    <div key={"placeholder-" + x} className="series-placeholder">
                        <div className="image" />
                        <div className="season" />
                        <div className="season" />
                    </div>
                )
            }
            return <div>
                {placeholder}
            </div>
        } else {
            return
        }
    }

    render() {
        return <Skeleton>
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
                        activeIcon="fa fa-sort-numeric-asc text-white"
                        inactiveIcon="fa fa-sort-numeric-asc"
                        tooltip="Nach verbleibender Zeit nicht gesehender Folgen"
                    />

                    <Dropdown list={selectableGenres} selected={selectableGenres[0]} onclick={this.selectGenre} />
                    <div className="spacer" />
                </div>
                <div className="series-table-content">
                    {this.state.userSeries.filter(this.filterSeries).sort(this.sortSeries).map((series) =>
                        <div key={series.id}>
                            <Series series={series} />
                        </div>
                    )}
                    {this.seriesPlaceholder()}
                </div>
            </div>
        </Skeleton>
    }

    private isCompleteWatched(series: SeriesModel) {
        return series.isWatched()
    }

    private hasNotWatched(series: SeriesModel) {
        return !series.isWatched()
    }

    private isAnimeGenre(series: SeriesModel) {
        if (!series.genres || !series.country) {
            return false
        }

        let resultGenre = false
        let resultCountry = false

        resultGenre = series.genres.some((genre) => genre === "Animation")
        resultCountry = series.country.some((country) => country === "JP")

        return resultGenre && resultCountry
    }

    private sortSeries = (seriesA: SeriesModel, seriesB: SeriesModel) => {
        if (this.state.sortRemainingTime) {
            return seriesA.totalMinutesNotWatched() - seriesB.totalMinutesNotWatched()
        } else if (this.state.sortAscending) {
            return seriesA.name.localeCompare(seriesB.name)
        }
        return seriesB.name.localeCompare(seriesA.name)
    }

    private filterSeries = (series: SeriesModel) => {
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
}
