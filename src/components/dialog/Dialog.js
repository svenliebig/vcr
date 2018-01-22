/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Dialog.css'

const ANIM_IN = 'slide-in-elliptic-top-fwd'
const ANIM_OUT = 'slide-out-elliptic-top-bck'

/**
 * Component Class of Dialog.
 *
 * @export
 * @class Dialog
 * @extends {Component}
 */
export default class Dialog extends Component {

	/**
	 * Creates an instance of Dialog.
	 * @memberof Dialog
	 */
	constructor(props) {
		super()

		this.state = {
			visible: props.visible,
			fadeout: false,
			classNameDialog: props.visible ? ANIM_IN : '',
			classNameContainer: props.visible ? 'fadein' : ''
		}

		this.fadeout = this.fadeout.bind(this)
		this.getContainerClass = this.getContainerClass.bind(this)
	}

	componentDidMount() {
		// this.setState({})
	}

	show() {
		this.setState({
			visible: true
		})
	}

	fadeout(e) {
		if (!e.target.classList.contains('dialog-container')) {
			return
		}
		this.setState({
			fadeout: true,
			className: ANIM_OUT
		}, () => {
			const self = this
			setTimeout(() => {
				self.setState({
					fadeout: false,
					visible: false
				})
				const dialog = document.getElementsByClassName("dialog-container")[0]
				if (dialog) {
					if (dialog.classList.contains("visible")) {
						dialog.classList.remove("visible")
					}
				}
			}, 700)
		})
	}

	getContainerClass() {
		let className = 'dialog-container'
		if (this.state.fadeout) {
			className += ' fadeout'
		}
		const dialog = document.getElementsByClassName("dialog-container")[0]
		if (dialog) {
			if (dialog.classList.contains("visible")) {
				className += ' visible'
			}
		}
		return className
	}

	getDialogClass() {
		let className = 'dialog'
		if (this.state.fadeout) {
			className += ` ${ANIM_OUT}`
		} else {
			className += ` ${ANIM_IN}`
		}
		const dialog = document.getElementsByClassName("dialog-container")[0]
		if (dialog) {
			if (dialog.classList.contains("visible")) {
				className += ' visible'
			}
		}
		return className
	}

	/**
	 * Renders the Component.
	 *
	 * @returns
	 * @memberof Dialog
	 */
	render() {
		return (
			<div className={this.getContainerClass()} onClick={this.fadeout}>
				<div className={this.getDialogClass()}>
					{this.props.title &&
						<div className='dialog-header'>
							{this.props.title}
						</div>
					}
					<div className='dialog-body'>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

Dialog.propTypes = {
	children: PropTypes.any.isRequired,
	title: PropTypes.string,
	visible: PropTypes.bool
}