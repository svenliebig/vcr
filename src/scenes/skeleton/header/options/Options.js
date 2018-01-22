import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

// Components
import IconBadge from "@components/IconBadge"

// Service
import Firebase from '@service/firebase/Firebase'
import Message from '@service/Message'
import UserRepository from '@service/user'
import SeriesRepository from '@service/series'
import SeriesCard from "@components/SeriesCard"
import SeriesapiService from '@service/api/Moviedb'

// CSS
import './Options.css';

const fb = new Firebase();

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
		this.msg = new Message()
		this.ur = new UserRepository()
		this.sr = new SeriesRepository()
		this.sapi = new SeriesapiService()


		this.logout = this.logout.bind(this);
		this.settings = this.settings.bind(this)

	}

	componentDidMount() {
		this.ur.getName().then(name => this.msg.getMessages(name).then(val => {

			const seriesMessages = []
			val.forEach((message, i) => this.sr.getSeries(message.series).then(series => {
				seriesMessages.push(series)
				if (i === val.length - 1) {
					this.setState({ seriesMessages, messages: val })
				}
			}))

		}))
	}

	logout() {
		fb.logout();
		window.location.pathname = "/";
	}

	settings() {
		document.getElementsByClassName("dialog-container")[0].classList.add("visible")
	}

	toggleMessages() {
		this.setState({ showMessages: !this.state.showMessages })
	}

	addSeries(_series, index) {
		this.sapi.getCompleteSeries(_series.id, (series) => {
			this.ur.addSeries(series)
			this.removeMessage(index)
		})
	}

	removeMessage(index) {
		const clear = this.state.messages.splice(index, 1)
		this.state.seriesMessages.splice(index, 1)
		this.setState({ messages: this.state.messages, seriesMessages: this.state.seriesMessages },
			() => this.msg.clearMessage(clear)
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

		if (fb.isLoggedIn()) {
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
			);
		} else {
			return (<div />);
		}
	}
}

export default withRouter(Options);
