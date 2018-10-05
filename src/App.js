import React, { Component } from 'react';
import './App.css';
import {JSO} from 'jso';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClientID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      ClientSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      AccessToken: '',
      Organisation: ''
    };

    this.goLogin = this.goLogin.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.getTimesheets = this.getTimesheets.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.getAccess(),
      1000
    );
  }

  goLogin() {
    let jso = new JSO({
        providerID: "bexio",
        client_id: this.state.ClientID,
        redirect_uri: "http://localhost:3000/",
        authorization: "https://office.bexio.com/oauth/authorize/",
        scopes: { request: ["article_show", "monitoring_show"]},
        response_type: 'code',
        client_secret: this.state.ClientID,
        token: "https://office.bexio.com/oauth/access_token/",
        request: { state: '1234567890'}
    });
    jso.getToken();
  }

  getAccess() {
    let codeLong = window.location.href.match(/code=([^&]*)/);
    if(codeLong) {
      clearInterval(this.timerID);
      let code = codeLong[0].slice(5);
      this.getAccessToken(code);
    }
  }

  getAccessToken(code) {
    
    //no 'access-control-allow-origin' header is present on the requested resource.

    let http = new XMLHttpRequest();
    const url = 'https://office.bexio.com/oauth/access_token/';
    const redirect_uri = 'http://localhost:3000/';

    const params = `client_id=${this.state.ClientID}&redirect_uri=${redirect_uri}&client_secret=${this.state.ClientSecret}&code=${code}`;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = () => {
        if(http.readyState === 4 && http.status === 200) {
            const json = JSON.parse(http.responseText);
            const accessToken = json.access_token;
            const organisation = json.org;
            this.setState({
              AccessToken: accessToken,
              Organisation: organisation
            });
            alert('got accessToken');
        }
    }
    http.send(params);
  }

  getArticles() {
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${this.state.Organisation}/article`;
    http.open( "GET", url, true );
    http.setRequestHeader("Accept",'application/json');
    http.setRequestHeader("Authorization",`Bearer ${this.state.AccessToken}`);

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            let articles = JSON.parse(http.responseText);
             console.log(articles);
        }
    }

    http.send();
  }

  getTimesheets() {
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${this.state.Organisation}/timesheet`;
    http.open( "GET", url, true );
    http.setRequestHeader("Accept",'application/json');
    http.setRequestHeader("Authorization",`Bearer ${this.state.AccessToken}`);

    http.onreadystatechange = function() {
      if(http.readyState === 4 && http.status === 200) {
          let timeSheets = JSON.parse(http.responseText); 
          console.log(timeSheets);
        }
      }
        
    http.send();
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.goLogin}>Login to Bexio</button>
        {this.state.AccessToken ? <button onClick={this.getArticles}>Get Articles</button> : null}
        {this.state.AccessToken ? <button onClick={this.getTimesheets}>Get Timesheets</button> : null}
      </div>
    );
  }
}

export default App;
