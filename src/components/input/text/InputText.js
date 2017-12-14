/** React Imports */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputText.css'

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

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
		const self = this

		this.state = {
			value: props.value || '',
			observer: new Subject()
		}

		this.onChange = this.onChange.bind(this)
		
		this.state.observer.debounceTime(props.throttled || 0).subscribe(() => {
				self.props.onChange(self.state.value)
			}
		);
	}

	onChange(e) {
		const { value } = e.target
		this.setState({ value: value })
		if (this.props.onChange)
			this.state.observer.next(value)
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
				<label htmlFor={ this.props.id } className="input-text--label">
					{ this.props.label }
				</label>
				<input id={ this.props.id } className="input-text" value={ this.state.value } onChange={ this.onChange } />
			</div>
		)
	}
}

InputText.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func,
	throttled: PropTypes.number,
	value: PropTypes.string
}