import React, { Component } from 'react'
import Nav from '@component/header/nav/Nav';
import Options from '@component/header/options/Options';
import getQuote from '@service/api/Quotes';
import './Header.css';

export default class Header extends Component {
  render() {
	return (
	  <div className="header-wrapper">
			<div>
				{ getQuote() }
			</div>
			<Nav />
			<Options />
	  </div>
	)
  }
}