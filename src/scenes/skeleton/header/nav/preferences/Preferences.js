import React, { Component } from 'react'
import Dialog from '@components/dialog'
import UserRepository from "@service/user"
import InputText from "@components/input/text"

export default class Preferences extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			loading: true
		}

		this.ur = new UserRepository()
		const self = this
		this.ur.getName().then(name => {
			self.setState({name, loading: false})
		})
	}

	changed(val) {
		this.ur.setName(val)
	}

	render() {
		console.log("value in render")
		console.log(this.state.name)
		return (
			<Dialog title="Einstellungen">
				{ this.state.loading ? '' :
					<InputText id="name-input" value={ this.state.name } label="Name" onChange={ this.changed.bind(this) } throttled={ 500 } />
				}
			</Dialog>
		)
	}
}