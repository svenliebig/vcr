/** React Imports */
import React, { Component } from "react"

import "./Chat.css"
import EventBus from "@service/EventBus/EventBus"
import environment from "@environment/environment"
import InputText from "@components/Input/Text"

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

		this.messageContainer

		this.state = {
			users: [],
			collapsed: true,
			input: "",
			messages: []
		}
	}

	componentDidMount() {
		EventBus.instance.emit("getName").then(name => {
			this.username = name
			this.connection = new WebSocket(environment.websocketurl)
			this.connection.onopen = () => {
				this.connection.send(this.username)
			}

			this.connection.onmessage = (e) => {
				this.handleMessage(e.data)
			}

			this.connection.onclose = () => {
				this.connection.send(this.username)
			}
		})
	}

	click(event) {
		if (event.target.id !== "chat-input") {
			this.setState({ collapsed: !this.state.collapsed }, () => {
				this.messageContainer.scrollTop = this.messageContainer.scrollHeight
			})
		}
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
			case "message":
				this.setState({ messages: message.value })
				break
			default:
				break
		}
	}

	handleEnter(value) {
		console.log(value)
		this.setState({ input: "" })
	}

	handleInput(value) {
		this.setState({ input: value })
	}

	handleSendMessage(value) {
		this.setState({ input: "" }, () => {
			const newMessage = { user: this.username, message: value }
			this.connection.send(JSON.stringify(newMessage))
		})
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Chat
	 */
	render() {
		return (
			<div className="chat-container">
				<div className="connection-head" onClick={this.click.bind(this)}>
					<div className="connection-symbol" />
					<div className="connections-amount">
						{this.state.users.length}
					</div>
				</div>
				<div className={`collapsable ${this.state.collapsed ? "collapsed" : ""}`}>
					<div className="userList">
						{this.state.users.map((val, i) =>
							<div key={i} className="chat-user">
								{val}
							</div>)}
					</div>
					<div className="chat-messages-container">
						<div className="chat-messages" ref={(element) => this.messageContainer = element}>
							{this.state.messages.map((val, i) =>
								<div key={i} className="chat-message">
									<div className="chat-message-writer">
										{val.user}:
									</div>
									<div className="chat-message-content">
										{val.message}
									</div>
								</div>
							)}
						</div>
						<div className="chat-input-container">
							<InputText id="chat-input" onChange={this.handleInput.bind(this)} value={this.state.input} onEnter={this.handleEnter.bind(this)} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Chat.propTypes = {
	// example: PropTypes.object.isRequired
}