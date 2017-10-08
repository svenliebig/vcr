import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';
import Firebase from '@service/firebase/Firebase';
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
	constructor() {
	  super();
	  this.fire = Firebase;  
	  this.state = {
			  email: '',
		password: '',
		logtext: 'not logged in'
	  };
	  
	  this.submit = this.submit.bind(this);
	  this.handleInputChange = this.handleInputChange.bind(this);
	}
  
	submit() {
		this.fire.login(this.state.email, this.state.password);
		window.location.pathname = "/";
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
			<div className="login-wrapper">
			  <label htmlFor="email">E-Mail</label>
			  <input id="email" type="text" value={ this.state.email } onChange={ this.handleInputChange }/>
			  <label htmlFor="password">Password</label>
			  <input id="password" type="password" value={ this.state.password } onChange={ this.handleInputChange } />
			  <input value="Submit" type="button" onClick={this.submit}/>
			</div>
		  </div>
		</Skeleton>
	  );
	}
}

export default withRouter(Login);