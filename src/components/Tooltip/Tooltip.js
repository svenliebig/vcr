/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Tooltip.css'

/**
 * Component Class of Tooltip.
 *
 * @export
 * @class Tooltip
 * @extends {Component}
 */
export default class Tooltip extends Component {

	/**
	 * Creates an instance of Tooltip.
	 * @memberof Tooltip
	 */
	constructor(props) {
		super()

		this.timeout;
        this.showTooltip = this.showTooltip.bind(this);
		this.hideTooltip = this.hideTooltip.bind(this);
	}

	componentDidMount() {
		// tooltip.appendChild(<span></span>)
	}

	renderChildrenWithTooltip() {
		return React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, {
				onMouseEnter: this.showTooltip,
				onMouseLeave: this.hideTooltip
			})
		})
	}

	// DIRTEY
	showTooltip(event) {
		const rect = event.target.getBoundingClientRect()
		const { x } = rect
		const { y } = rect
		const { width } = rect
		const tooltip = document.getElementById("tooltip")

		tooltip.querySelector(".text").innerHTML = this.props.text
		const caret = tooltip.querySelector("#tooltip .caret")


		tooltip.style.opacity = "0"
		tooltip.style.display = "block"
		let left = x - (tooltip.clientWidth / 2) + (width / 2);
		tooltip.style.left = `${left}px`
		left = x - (tooltip.clientWidth / 2) + (width / 2);
		tooltip.style.left = `${left}px`
		tooltip.style.top = `${y - tooltip.clientHeight - 8 }px`


		// wenn man soweit rechts ist, das der Tooltip an die Wand knallt, justiere den pfeil
		const helper = tooltip.offsetLeft - (x - (tooltip.clientWidth / 2) + (width / 2))
		if (helper < -1) {
			caret.style.left = "calc(50% + " + (helper * -1) + "px)";
		} else {
			caret.style.left = "50%"
		}

		// TODO tooltip left, right, top, bottom

		this.timeout = setTimeout(() => {
			tooltip.style.opacity = "1"
		}, 500)
	}

	hideTooltip() {
		const tooltip = document.getElementById("tooltip")
		// tooltip.style.display = "none"
		clearTimeout(this.timeout)
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Tooltip
	 */
	render() {
		return (
			<div className="tooltip">
				{ this.renderChildrenWithTooltip() }
			</div>
		)
	}
}

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired
}