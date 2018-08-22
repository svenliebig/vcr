/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './IconBadge.css'

/**
 * Component Class of IconBadge.
 *
 * @export
 * @class IconBadge
 * @extends {Component}
 */
export default class IconBadge extends Component {

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof IconBadge
	 */
	render() {
		return (
			<div role="button" className={`iconbadge ${this.props.icon}`} onClick={this.props.onClick} tabIndex={0} onKeyDown={() => {}}>
				{this.props.counter !== 0 ?
					<span className="badge">{this.props.counter < 10 ? this.props.counter : "9+"}</span>
					: ""}
			</div>
		)
	}
}

IconBadge.propTypes = {
	icon: PropTypes.string.isRequired,
	counter: PropTypes.number.isRequired,
	onClick: PropTypes.func
}