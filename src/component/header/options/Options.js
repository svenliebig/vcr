import React, { Component } from 'react';
import Firebase from '@service/firebase/Firebase';
import { Link, withRouter } from "react-router-dom";
import './Options.css';

class Options extends Component {
  constructor() {
	super();
	
	this.logout = this.logout.bind(this);
  }

  logout() {
		Firebase.logout();
		window.location.pathname = "/";
  }

  render() {
    return (
		<div className="options-wrapper">
			<div className="options-container">
				<button onClick={ this.logout }>LO</button>
			</div>
		</div>
    );
  }
}

export default withRouter(Options);
