import React, { Component } from 'react'
import Header from './header/Header';

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
				<Header />
				<div className="content">
					{ this.props.children }
				</div>
			</div>
		)
	}
}
