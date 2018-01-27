/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Chat.css'
import EventBus from '@service/EventBus/EventBus';

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
			users: []
		}
	}

	componentDidMount() {
		EventBus.instance.emit("getName").then(name => {
			this.username = name
			this.connection = new WebSocket("ws://127.0.0.1:8081")
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
		console.log("click")
		// this.connection.send("this.username")
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
				<div className="connection-symbol" />
				<div className="connections-amount">
					{this.state.users.length}
				</div>
			</div>
		)
	}
}

Chat.propTypes = {
	// example: PropTypes.object.isRequired
}