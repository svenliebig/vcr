import React, { Component } from 'react'

/**
 * 
 * asdf
 * 
 * @export
 * @class Skeleton
 * @extends {Component}
 */
export default class Skeleton extends Component {
  render() {
	return (
			<div>
				<div className="header">
					Header
				</div>
				<div className="content">
					{ this.props.children }
				</div>
			</div>
		)
	}
}
