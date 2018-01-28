/** React Imports */
import React, { Component } from "react"
import PropTypes from "prop-types"

import { Subject } from "rxjs/Subject"
import "rxjs/add/operator/debounceTime"

import "./InputText.css"

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
			value: props.value || ""
		}

		this.observer = new Subject()
		this.onChange = this.onChange.bind(this)

		this.observer.debounceTime(props.throttled || 0).subscribe(() => {
			this.props.onChange(this.state.value, this.props.id)
		})
	}

	onChange(e) {
		const { value } = e.target
		this.setState({ value: value })
		if (this.props.onChange) {
			this.observer.next(value)
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.value })
	}

	handleKeypress(e) {
		if (e.key === "Enter" && this.props.onEnter) {
			this.props.onEnter(this.props.value)
		}
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
				{this.props.label ?
					<label htmlFor={this.props.id} className="input-text--label">
						{this.props.label}
					</label>
					: ""}
				<input
					id={this.props.id}
					className="input-text"
					value={this.state.value}
					onChange={this.onChange}
					placeholder={this.props.placeholder}
					type={this.props.type}
					onKeyPress={this.handleKeypress.bind(this)}
				/>
			</div>
		)
	}
}

InputText.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func,
	onEnter: PropTypes.func,
	throttled: PropTypes.number,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(["password"])
}