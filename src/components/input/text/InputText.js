/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputText.css'

/**
 * Component Class of InputText.
 * 
 * @export
 * @class InputText
 * @extends {Component}
 */
export default class InputText extends Component {

	/**
	 * Creates an instance of InputText.
	 * @memberof InputText
	 */
	constructor(props) {
		super()

		this.state = {
			props
		}
	}

	componentDidMount() {
		// this.setState({})
	}

	/**
	 * Renders the Component.
	 * 
	 * @returns 
	 * @memberof InputText
	 */
	render() {
		return (
			<div className="input-text--wrapper">
				<label className="input-text--label">
					{ this.props.label }
				</label>
				<input className="input-text" />
			</div>
		)
	}
}

InputText.propTypes = {
	label: PropTypes.string
}