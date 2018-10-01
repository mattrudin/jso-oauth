import {JSO} from 'jso';

let jso = new JSO({
	providerID: "bexio",
	client_id: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	redirect_uri: "http://localhost:3000/", // The URL where you is redirected back, and where you perform run the callback() function.
	authorization: "https://office.bexio.com/oauth/authorize",
    scopes: { request: ["article_show"]},
    response_type: 'code',
	client_secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    token: "https://office.bexio.com/oauth/access_token",
    request: { state: '1234567890'}
});

export const callback = () => {
    jso.callback();
}

export const getCode = () => {
    let accessCode = '';
    if(!accessCode) {
        accessCode = window.location.href.match(/code=([^&]*)/);
        localStorage.setItem('code', accessCode);
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

const getAccessToken = (code) => {
    const request = new Request('https://office.bexio.com/oauth/access_token', {
        headers: new Headers({
            'method': 'post',
            'client_id': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            'redirect_uri': 'http://localhost:3000/',
            'client_secret': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            'code': code
        })
    });
    fetch(request).then(response => {return response.json()}).then(jsonResponse => console.log(jsonResponse));
}

export const login = () => {
    setInterval(() => getCode(), 1000);
    jso.getToken();
    const code = getCode();
    getAccessToken(code);
}
