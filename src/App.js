import React, { Component } from 'react';
import './App.css';
import { getCode, oauthLogin, getAccessToken, shortenCode } from './utils/oauth';

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
        <button onClick={oauthLogin}>Get Code</button>
        <button onClick={shortenCode}>Shorten Code</button>
        <button onClick={getAccessToken}>Get AccessToken</button>
      </div>
    );
  }
}

export default App;
