/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Chat.css'
import EventBus from '@service/EventBus/EventBus';
import Tooltip from '@components/Tooltip';

/**
 * Component Class of Chat.
 *
 * @export
 * @class Chat
 * @extends {Component}
 */
export default class Chat extends Component {

	/**
	 * Creates an instance of Chat.
	 * @memberof Chat
	 */
	constructor() {
		super()

		this.state = {
			users: [],
			collapsed: true
		}
	}

	componentDidMount() {
		EventBus.instance.emit("getName").then(name => {
			this.username = name
			this.connection = new WebSocket("ws://tv.websocket.slyox.de/ws")
			this.connection.onopen = () => {
				this.connection.send(this.username)
			}

			this.connection.onmessage = (e) => {
				this.handleMessage(e.data)
			}

			this.connection.onclose = (event) => {
				this.connection.send(this.username)
			}
		})
	}

	click() {
		this.setState({ collapsed: !this.state.collapsed })
	}

	handleMessage(incomingMessage) {
		let message
		try {
			message = JSON.parse(incomingMessage)
		} catch (e) {
			console.error("Error trying to parse the json data. %s", e)
			return
		}

		switch (message.context) {
			case "clients":
				this.setState({ users: message.value })
				break
			default:
				break
		}
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Chat
	 */
	render() {
		return (
			<div className="chat-container" onClick={this.click.bind(this)}>
				<div className="connection-head">
					<div className="connection-symbol" />
					<div className="connections-amount">
						{this.state.users.length}
					</div>
				</div>
				<div className={`collapsable ${this.state.collapsed ? "collapsed" : ""}`}>
					{this.state.users.map(val => <div className="chat-user">{val}</div>)}
				</div>
			</div>
		)
	}
}

Chat.propTypes = {
	// example: PropTypes.object.isRequired
}