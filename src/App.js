import React, { Component } from 'react';
import logo from './logo.svg';
import Firebase from './service/firebase/Firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let t = Firebase;
    t.login("tester@tester.test", "test1234");
    t.setAfterLogin(() => {
      let uid = t.getUser().uid;
      t.write(`/users/${uid}`);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
