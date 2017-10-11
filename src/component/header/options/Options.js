import React, { Component } from 'react';
import Firebase from '@service/firebase/Firebase';
import { withRouter } from "react-router-dom";
import './Options.css';

const fb = new Firebase();

class Options extends Component {
  constructor() {
	super();
	
	this.logout = this.logout.bind(this);
  }

  logout() {
		fb.logout();
		window.location.pathname = "/";
  }

  render() {
		if (fb.isLoggedIn()) {
			return (
					<div className="options-wrapper">
						<div className="options-container">
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
