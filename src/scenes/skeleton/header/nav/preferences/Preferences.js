import React, { Component } from 'react'
import Dialog from '@components/dialog'
import InputText from "@components/input/text"
import EventBus from '@service/EventBus/EventBus';

export default class Preferences extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: null
		}

		EventBus.instance.emit("getName").then(name => this.setState({ name }))
	}

	changed(val) {
		this.ur.setName(val)
	}

	render() {
		return (
			<Dialog title="Einstellungen">
				{this.state.name ? <InputText id="name-input" value={this.state.name} label="Name" onChange={this.changed.bind(this)} throttled={500} /> : ""
				}
			</Dialog>
		)
	}
}