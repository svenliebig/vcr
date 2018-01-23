/** React Imports */
import React, { Component } from "react"
import PropTypes from "prop-types"
import EventBus from "@service/EventBus/EventBus"
import UserRepository from "@service/user/UserRepository";
import SeriesRepository from "@service/series/SeriesRepository";
import SeriesapiService from "@service/api/Moviedb";

/**
 * Component Class of EventHandler.
 *
 * @export
 * @class EventHandler
 * @extends {Component}
 */
export default class EventHandler extends Component {

	/**
	 * Creates an instance of EventHandler.
	 * @memberof EventHandler
	 */
	constructor(props) {
		super(props)
		this.userRepository = new UserRepository()
		this.seriesApi = new SeriesapiService()
		this.seriesRepository = new SeriesRepository()

		EventBus.instance.register("addSeries", (id) => {

			return this.seriesApi.getCompleteSeries(id, (series) => {
				this.userRepository.addSeries(series)
				this.seriesRepository.addSeries(series)
				return Promise.resolve()
			})

		})

		// User Repository
		EventBus.instance.register("getOpenSeries", () => this.userRepository.getOpenSeries())
		EventBus.instance.register("getFinishedSeries", () => this.userRepository.getFinishedSeries())
		EventBus.instance.register("removeSeries", id => this.userRepository.removeSeries(id))
		EventBus.instance.register("updateWatchedSeries", series => this.userRepository.updateWatchedSeries(series))
		EventBus.instance.register("getUsers", series => this.userRepository.getUsers(series))
		EventBus.instance.register("getAllSeries", () => this.userRepository.getAllSeries())
		EventBus.instance.register("getName", () => this.userRepository.getName())
		EventBus.instance.register("hasSeries", id => this.userRepository.hasSeries(id))

		// Series Repository
		EventBus.instance.register("getSeries", id => this.seriesRepository.getSeries(id))
		EventBus.instance.register("getLinksOfSeries", id => this.seriesRepository.getLinksOfSeries(id))
		EventBus.instance.register("saveLinkToSeries", (id, type, val) => this.seriesRepository.saveLinkToSeries(id, type, val))
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

EventHandler.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.element
	]).isRequired
}