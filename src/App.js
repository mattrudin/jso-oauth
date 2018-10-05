import React, { Component } from 'react';
import './App.css';
import { loginFunction, clearStorage, getCode, oauthLogin, getAccessToken, shortenCode, getArticles } from './utils/oauth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      token: ''
    }
  }

  /* componentDidMount() {
    this.timerID = setInterval(
      () => getCode(),
      1000
    );
  } */

  render() {
    return (
      <div className="App">
        <button onClick={loginFunction}>Login to Bexio</button>
        <button onClick={clearStorage}>Clear Storage</button>
        <button onClick={oauthLogin}>Get Code</button>
        <button onClick={getCode}>Save Code</button>
        <button onClick={shortenCode}>Shorten Code</button>
        <button onClick={getAccessToken}>Get AccessToken</button>
        <button onClick={getArticles}>Get Articles</button>
      </div>
    );
  }
}

export default App;
