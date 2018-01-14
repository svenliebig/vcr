import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Firebase from '@service/firebase/Firebase';
import { withRouter } from "react-router-dom";

import './Options.css';

const fb = new Firebase();

class Options extends Component {
  constructor() {
	super();

	this.state = {
		settings: false
	}

	this.logout = this.logout.bind(this);
	this.settings = this.settings.bind(this)

}

logout() {
	fb.logout();
	window.location.pathname = "/";
}

settings() {
	document.getElementsByClassName("dialog-container")[0].classList.add("visible")
}

render() {
	if (fb.isLoggedIn()) {
		return (
				<div className="options-wrapper">
					<div className="options-container">
						<button onClick={ this.settings } title="Einstellungen">
							<span className="fa fa-cog"></span>
						</button>
						<button onClick={ this.logout } title="Ausloggen">
							<span className="fa fa-power-off"></span>
						</button>
					</div>
				</div>
		);
	} else {
		return (<div/>);
	}
  }
}

export default withRouter(Options);
