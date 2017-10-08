import React, { Component } from 'react';
import Skeleton from './Skeleton';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Skeleton>
        Hello
      </Skeleton>
    );
  }
}

export default App;
