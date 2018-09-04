/** React Imports */
import environment from "@environment/environment"
import EventBus from "@service/EventBus/EventBus"
import Message from "@service/Message/Message"
import ServiceFactory from "@utils/ServiceFactory"
import "firebase/auth"
import "firebase/database"
import React, { Component, ReactNode } from "react"
import SeriesapiService from "vcr-shared/service/Moviedb"
import SeriesRepository from "vcr-shared/service/SeriesRepository"
import UserRepository from "vcr-shared/service/UserRepository"

export interface Props { children: ReactNode }

/**
 * Component Class of EventHandler.
 *
 * @export
 * @class EventHandler
 * @extends {Component}
 */
export default class EventHandler extends Component<Props> {
    private auth = ServiceFactory.auth
    private userRepository = new UserRepository(ServiceFactory.database, ServiceFactory.auth)
    private seriesRepository = new SeriesRepository(ServiceFactory.database)
    private seriesApi = new SeriesapiService(environment.themoviedb)
    private message = new Message()

    /**
	 * Creates an instance of EventHandler.
	 * @memberof EventHandler
	 */
    constructor(props: Props) {
        super(props)

        // Movie DB Api
        EventBus.instance.register("addSeries", (id) => {
            return this.seriesApi.getCompleteSeries(id).then(series => {
                console.debug(series)
                this.userRepository.addSeries(series)
                this.seriesRepository.addSeries(series)
                return Promise.resolve(series)
            })
        })
        EventBus.instance.register("findSeriesByName", (name) => this.seriesApi.findSerieByName(name))

        // User Management
        EventBus.instance.register("logout", (() => {
            this.auth.logout()
            window.location.pathname = "/"
        }))

        // Messages
        EventBus.instance.register("getMessages", () => this.userRepository.getName().then(name => this.message.getMessages(name)))
        EventBus.instance.register("clearMessage", clear => this.message.clearMessage(clear))
        EventBus.instance.register("writeMessage", (id, to) =>
            this.userRepository.getName().then(from =>
                this.message.writeMessage(id, from, to)))

        // User Repository
        EventBus.instance.register("getOpenSeries", () => this.userRepository.getOpenSeries())
        EventBus.instance.register("getFinishedSeries", () => this.userRepository.getFinishedSeries())
        EventBus.instance.register("removeSeries", id => this.userRepository.removeSeries(id))
        EventBus.instance.register("updateWatchedSeries", series => this.userRepository.updateWatchedSeries(series))
        EventBus.instance.register("getAllSeries", () => this.userRepository.getAllSeries())
        EventBus.instance.register("getUserSeries", id => this.userRepository.getSeries(id))
        EventBus.instance.register("getUserByName", name => this.userRepository.getUserByName(name))
        EventBus.instance.register("getUsers", () => this.userRepository.getUsers())
        EventBus.instance.register("getName", () => this.userRepository.getName())
        EventBus.instance.register("setName", (name) => this.userRepository.setName(name))
        EventBus.instance.register("hasSeries", id => this.userRepository.hasSeries(id))
        EventBus.instance.register("checkUser", () => this.userRepository.checkUser())
        EventBus.instance.register("getUserDirectory", () => this.userRepository.getUserDirectory())
        EventBus.instance.register("getCurrentUserUid", () => this.userRepository.getCurrentUserUid())

        // Series Repository
        EventBus.instance.register("getSeries", id => this.seriesRepository.getSeries(id))
        EventBus.instance.register("getLinksOfSeries", id => this.seriesRepository.getLinksOfSeries(id))
        EventBus.instance.register("saveLinkToSeries", (id, type, val) => this.seriesRepository.saveLinkToSeries(id, type, val))
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}