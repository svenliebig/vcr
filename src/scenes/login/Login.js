import React, { Component } from 'react'
import Skeleton from '@scenes/skeleton/Skeleton';
import Firebase from '@service/firebase/Firebase';
import { withRouter } from "react-router-dom";

import './Login.css';
import { Tab, Tabs } from '@components/tabs';

/**
 * Login View.
 */
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

		this.submitLogin = this.submitLogin.bind(this);
		this.submitRegistration = this.submitRegistration.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAction = this.handleAction.bind(this);
	}

	submitLogin(event) {
		event.preventDefault();
		this.fire.login(this.state.email, this.state.password).then(() => this.handleAction())
	}

	submitRegistration(event) {
		event.preventDefault();
		this.fire.createUser(this.state.email, this.state.password).then(() => this.handleAction())
	}

	handleAction() {
		const error = this.fire.getError()
		if (error){
			this.setState(() => ({ error }))
		} else {
			window.location.pathname = "/"
		}
		this.fire.clearError();
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
		<Skeleton dontRenderHeader={ true }>
			<div className="login-wrapper">
				<div className="login-wrapper--container">
				<Tabs defaultActiveTabIndex={ 0 } className="login-wrapper--tabs">
					<Tab title="Login" className="login-wrapper--tab">
						<form onSubmit={this.submitLogin} className="login-wrapper--form" >
							<div className="input">
								<p className="input-title">
									VCR
								</p>
								<div className="input-area">
									<label
										className="input-area--label"
										htmlFor="password"
									>
										E-Mail
									</label>
									<input
										className="input-area--input"
										id="email"
										placeholder="E-Mail"
										type="text"
										onChange={this.handleInputChange}
										value={this.state.email}
									/>
								</div>
								<div className="input-area">
									<label
										className="input-area--label"
										htmlFor="password"
									>
										Password
									</label>
									<input
										className="input-area--input"
										id="password"
										placeholder="Password"
										type="password"
										onChange={this.handleInputChange}
										value={this.state.password}
									/>
								</div>
								<div className="input-area">
									<input
										className="input-area--button"
										type="submit"
										value="Login"
									/>
								</div>
							</div>
						</form>
					</Tab>
					<Tab title="Registrieren">
						<form onSubmit={this.submitRegistration} className="login-wrapper--form" >
							<div className="input">
								<p className="input-title">
									VCR
								</p>
								<div className="input-area">
									<label
										className="input-area--label"
										htmlFor="password"
									>
										E-Mail
									</label>
									<input
										className="input-area--input"
										id="email"
										placeholder="E-Mail"
										type="text"
										onChange={this.handleInputChange}
										value={this.state.email}
									/>
								</div>
								<div className="input-area">
									<label
										className="input-area--label"
										htmlFor="password"
									>
										Password
									</label>
									<input
										className="input-area--input"
										id="password"
										placeholder="Password"
										type="password"
										onChange={this.handleInputChange}
										value={this.state.password}
									/>
								</div>
								<div className="input-area">
									<input
										className="input-area--button"
										type="submit"
										value="Registrieren"
									/>
								</div>
							</div>
						</form>
					</Tab>
				</Tabs>
				</div>
				{!!this.state.error ? <p className="input-area--login-error">{this.state.error}</p> : null}
			</div>
		</Skeleton>
	  );
	}
}

export default withRouter(Login);