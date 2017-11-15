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
				{ this.props.dontRenderHeader ? '' : <Header /> }
				<div className="content" style={{ padding: '30px', marginTop: '50px' }}>
					{ this.props.children }
				</div>
			</div>
		)
	}
}
