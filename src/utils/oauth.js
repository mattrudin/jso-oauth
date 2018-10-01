import {JSO} from 'jso';

let jso = new JSO({
	providerID: "bexio",
	client_id: "XXXXXXXXXXXXXXXXXXXXX",
	redirect_uri: "http://localhost:3000/", // The URL where you is redirected back, and where you perform run the callback() function.
	authorization: "https://office.bexio.com/oauth/authorize",
    scopes: { request: ["article_show"]},
    response_type: 'code',
	client_secret: "XXXXXXXXXXXXXXXXXXXXXXXX",
    token: "https://office.bexio.com/oauth/access_token",
    request: { state: '1234567890'}
});

export const getCode = () => {
    let accessCode = '';
    if(!accessCode) {
        accessCode = window.location.href.match(/code=([^&]*)/);
        localStorage.setItem('codeLong', accessCode);
    } else {
        return
    }
    return accessCode;
}

export const oauthLogin = () => {
    jso.getToken()
    .then((accessToken) => {
        console.log("I got the token: ", accessToken);
        this.setState({
            token: accessToken
        })
    })
}

export const shortenCode = () => {
    const codeLong = localStorage.getItem('codeLong');
    const codeShort = codeLong.match("code=(.*),");
    localStorage.setItem('code', codeShort[1]);
}

export const getAccessToken = () => {
    const code = localStorage.getItem('code');
    const url = 'https://office.bexio.com/oauth/access_token';
    fetch(url, { 
        method: 'post', 
        headers: new Headers({
            'X-Requested-With': null, //needs further testing
            'client_id': 'XXXXXXXXXXXXXXXXXXXXX',
            'redirect_uri': 'http://localhost:3000/',
            'client_secret': 'XXXXXXXXXXXXXXXXXXXXX',
            'code': code
        }) 
      });
}

