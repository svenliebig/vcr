import React, { Component } from 'react'
import Header from './header/Header'
import PropTypes from 'prop-types'

/** *
 * @export
 * @class Skeleton
 * @extends {Component}
 */
export default class Skeleton extends Component {
	render() {
		return (
			<div>
				{this.props.dontRenderHeader ? '' : <Header />}
				<div className="content" style={{ padding: '30px', marginTop: '50px' }}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

Skeleton.propTypes = {
	/** Turn on or off the header, default true */
	dontRenderHeader: PropTypes.bool,
	/** Children are rendered within the {@link Skelleton} */
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.element
	]).isRequired
}