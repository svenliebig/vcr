import React, { Component } from 'react'
import './Nav.css';

export default class Nav extends Component {
  render() {
	return (
	  <div className="nav-wrapper">
			<div className="nav-container">
				<ul>
					<li>nav1</li>
					<li>nav2</li>
					<li>nav3</li>
				</ul>
			</div>
	  </div>
	)
  }
}
