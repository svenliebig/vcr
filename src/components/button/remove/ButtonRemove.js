/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ButtonRemove.css'

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

	componentDidMount() {
		// this.setState({})
	}

	/**
	 * Renders the Component.
	 * 
	 * @returns 
	 * @memberof ButtonRemove
	 */
	render() {
		return (
			<button className="button--remove" title="Serie Löschen" onClick={ this.props.onClick }>
				<span className="fa fa-trash"></span>
			</button>
		)
	}
}

ButtonRemove.propTypes = {
	onClick: PropTypes.func.isRequired
}