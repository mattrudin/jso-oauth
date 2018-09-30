import {JSO} from 'jso';

let jso = new JSO({
	providerID: "bexio",
	client_id: "XXXXXXXXXXXXXXXXXXXXXXX",
	redirect_uri: "http://localhost:3000/", // The URL where you is redirected back, and where you perform run the callback() function.
	authorization: "XXXXXXXXXXXXXXXXXXXXXXX",
    scopes: { request: ["article_show"]},
    response_type: 'code',
	client_secret: "WquLo3P4/XiAaG6qvRMi117uQdg=",
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
    }
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