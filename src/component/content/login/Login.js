import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import Firebase from '@service/firebase/Firebase';
import { withRouter } from "react-router-dom";

import './Login.css';

class Login extends Component {
	constructor() {
		super();
		this.fire = new Firebase();
		this.state = {
			email: '',
			password: '',
			logtext: 'not logged in',
			error: undefined
		};

		this.submit = this.submit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
  
	submit(event) {
		event.preventDefault();
		this.fire.login(this.state.email, this.state.password).then(() => {
		
			// @Cedric
			// War vorher quasi nicht möglich, hatte ich mit dieser hässlichen "afterLogin" methode gelöst, habe jetzt Promises eingebaut
			// .then wird nach dem login aufgerufen
			// siehe: Firebase.js Zeile 128 und 130
			const error = this.fire.getError();
			if (error) {
				this.setState(() => ({error}))
			} else {
				window.location.pathname = "/";
			}

		});
	}


	
	handleInputChange(event) {
	  const target = event.target;
	  const value = target.type === 'checkbox' ? target.checked : target.value;
	  const name = target.id;
  
	  this.setState({
			[name]: value
	  });
	}
  
	render() {
	  return (
		<Skeleton>
		  <div className="App">
				<form className="login-wrapper" onSubmit={this.submit} >
					<div className="login-wrapper--form">
					<div className="input">
						<p className="input-title">
						VCR
						</p>
						<div className="input-area">
							<label
								htmlFor="password"
								className="input-area--label"
							>	
								E-Mail
							</label>
							<input 
								className="input-area--input"
								id="email" 
								placeholder="E-Mail"
								type="text" 
								value={this.state.email} 
								onChange={this.handleInputChange} 
							/>
						</div>
						<div className="input-area">
							<label 
								htmlFor="password"
								className="input-area--label"
							>	
								Password
							</label>
							<input 
								className="input-area--input"
								id="password" 
								type="password" 
								placeholder="Password"
								value={this.state.password} 
								onChange={this.handleInputChange} />
						</div>
						<div className="input-area">
							<input 
								className="input-area--button"
								value="Submit" 
								type="submit" 
							/>
								</div>
						</div>
					</div>
					{!!this.state.error ? <p className="input-area--login-error">{this.state.error}</p> : null}
				</form>
		  </div>
		</Skeleton>
	  );
	}
}

export default withRouter(Login);