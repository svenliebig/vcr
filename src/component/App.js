import React, { Component } from 'react';
import Firebase from '../service/firebase/Firebase';
import Skeleton from './Skeleton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let t = Firebase;
    //t.login("tester@tester.test", "test1234");
    t.setAfterLogin(() => {
      let uid = t.getUser().uid;
      t.write(`/users/${uid}`);
      this.setState({
        logtext: 'logged in'
      })
    });

    this.state = {
			email: '',
      password: '',
      logtext: 'not logged in'
		};
  }

  render() {
    return (
      <Skeleton>
        <div className="App">
          <form className="login-wrapper">
            <label htmlFor="email">E-Mail</label>
            <input id="email" type="text" value={ this.state.email } />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={ this.state.password } />
          </form>
          { this.state.logtext }
        </div>
      </Skeleton>
    );
  }
}

export default App;
