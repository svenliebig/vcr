import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Components
import IconBadge from "@components/IconBadge"
import SeriesCard from "@components/SeriesCard"

// Service
import EventBus from "@service/EventBus/EventBus"

// CSS
import './Options.css';

class Options extends Component {
	constructor() {
		super();

		this.state = {
			settings: false,
			showMessages: false,
			messages: [],
			seriesMessages: []
		}

		this.messages = []

		this.logout = this.logout.bind(this);
		this.settings = this.settings.bind(this)

	}

	componentDidMount() {
		EventBus.instance.emit("getMessages").then(val => {
			const seriesMessages = []
			val.forEach((message, i) => EventBus.instance.emit("getSeries", message.series).then(series => {
				seriesMessages.push(series)
				if (i === val.length - 1) {
					this.setState({ seriesMessages, messages: val })
				}
			}))
		})
	}

	logout() {
		EventBus.instance.emit("logout")
	}

	settings() {
		document.getElementsByClassName("dialog-container")[0].classList.add("visible")
	}

	toggleMessages() {
		this.setState({ showMessages: !this.state.showMessages })
	}

	addSeries(_series, index) {
		EventBus.instance.emit("addSeries", _series.id).then(() => this.removeMessage(index))
	}

	removeMessage(index) {
		const clear = this.state.messages.splice(index, 1)
		this.state.seriesMessages.splice(index, 1)
		this.setState({ messages: this.state.messages, seriesMessages: this.state.seriesMessages },
			() => EventBus.instance.emit("clearMessage", clear)
		)
	}

	render() {
		const renderMessages = () => {
			if (this.state.showMessages) {
				return this.state.messages.map((message, i) =>
					<div key={i} className="suggestion">
						<SeriesCard series={this.state.seriesMessages[i]}>
							<div className="actions">
								<button onClick={this.addSeries.bind(this, this.state.seriesMessages[i], i)}><span className="fa fa-plus"></span></button>
								<span className="from">Von: {message.from}</span>
								<button className="remove-message" onClick={this.removeMessage.bind(this, i)}>
									<span className="fa fa-times"></span>
								</button>
							</div>
						</SeriesCard>
					</div>
				)
			}
		}

		return (
			<div className="options-wrapper">
				<div className="options-container">
					<IconBadge icon="fa fa-envelope-o" counter={this.state.messages.length} onClick={this.toggleMessages.bind(this)} />
					<button onClick={this.settings} title="Einstellungen">
						<span className="fa fa-cog"></span>
					</button>
					<button onClick={this.logout} title="Ausloggen">
						<span className="fa fa-power-off"></span>
					</button>
				</div>
				<div className="messages">
					{renderMessages()}
				</div>
			</div >
		)
	}
}

export default withRouter(Options);
