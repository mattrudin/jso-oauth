import React, { Component } from 'react';
import './App.css';
import { getCode, oauthLogin } from './utils/oauth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      token: ''
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => getCode(),
      1000
    );
  }

  render() {
    return (
      <div className="App">
        <button onClick={oauthLogin}>accessToken</button>
        <p>{this.state.code}</p>
      </div>
    );
  }
}

export default App;
