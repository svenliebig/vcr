import React, { Component } from 'react';
import Firebase from '../service/firebase/Firebase';
import Skeleton from './Skeleton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.t = Firebase;
    //t.login("tester@tester.test", "test1234");
    // t.setAfterLogin(() => {
    //   let uid = t.getUser().uid;
    //   t.write(`/users/${uid}`);
    //   this.setState({
    //     logtext: 'logged in'
    //   })
    // });

    this.state = {
			email: '',
      password: '',
      logtext: 'not logged in'
    };
    
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submit(event) {
    console.log("submit");
    this.t.login(this.state.email, this.state.password);
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
          <form className="login-wrapper" onSubmit={this.handleSubmit}>
            <label htmlFor="email">E-Mail</label>
            <input id="email" type="text" value={ this.state.email } onChange={ this.handleInputChange }/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={ this.state.password } onChange={ this.handleInputChange } />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Skeleton>
    );
  }
}

export default App;
