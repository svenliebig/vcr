/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ButtonToggle.css'

/**
 * Component Class of ButtonToggle.
 *
 * @export
 * @class ButtonToggle
 * @extends {Component}
 */
export default class ButtonToggle extends Component {

	/**
	 * Creates an instance of ButtonToggle.
	 * @memberof ButtonToggle
	 */
	constructor(props) {
		super(props)

		this.state = {
			toggled: props.initial || false,
			activeIcon: props.activeIcon || 'fa fa-toggle-on',
			inactiveIcon: props.inactiveIcon || 'fa fa-toggle-off'
		}

		this.toggle = this.toggle.bind(this)
	}

	toggle() {
		this.setState({
			toggled: !this.state.toggled
		}, () => {
			if (this.props.onClick) {
				this.props.onClick(this.state.toggled)
			}
		});
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof ButtonToggle
	 */
	render() {
		return (
			<button
				className={ `button-toggle ${this.props.className}` }
				onClick={ this.toggle }
			>
				{  this.props.text ? <span>{ this.props.text } </span> : '' }
				<span className={ this.state.toggled ? this.state.activeIcon : this.state.inactiveIcon }></span>
			</button>
		)
	}
}

ButtonToggle.propTypes = {
	/** Text that is display before the toggle */
	text: PropTypes.string,
	/** Function that is called with the new value after the toggle is triggered, value is false | true */
	onClick: PropTypes.func,
	/** Classname of the button */
	className: PropTypes.string,
	/** Initial State */
	initial: PropTypes.bool,
	/** Icon when toggle is on */
	activeIcon: PropTypes.string,
	/** Icon when toggle is off */
	inactiveIcon: PropTypes.string
}