/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tooltip from "../../Tooltip"

import './Mail.css'

/**
 * Component Class of ButtonRemove.
 *
 * @export
 * @class ButtonRemove
 * @extends {Component}
 */
export default class ButtonRemove extends Component {

	/**
	 * Creates an instance of ButtonRemove.
	 * @memberof ButtonRemove
	 */
	constructor(props) {
		super()

		this.state = {
			props
		}
	}
	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof ButtonRemove
	 */
	render() {
		return (
			<Tooltip text="Serie empfehlen">
				<button className="button--mail" onClick={this.props.onClick}>
					<span className="fa fa-envelope-o"></span>
				</button>
			</Tooltip>
		)
	}
}

ButtonRemove.propTypes = {
	onClick: PropTypes.func.isRequired
}