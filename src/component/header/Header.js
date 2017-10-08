import React, { Component } from 'react'
import Nav from '@component/header/nav/Nav';
import Options from '@component/header/options/Options';
import './Header.css';

export default class Header extends Component {
  render() {
	return (
	  <div className="header-wrapper">
			<Nav />
			<Options />
	  </div>
	)
  }
}
