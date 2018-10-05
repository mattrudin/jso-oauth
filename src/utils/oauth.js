import {JSO} from 'jso';

const clientID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const clientSecret = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

export async function loginFunction() {
   // setLoginData(clientIDinput, clientSecretinput);
    clearStorage();
    await oauthLogin();
    await getCode();
    await shortenCode();
    await getAccessToken();
    alert('Async function complete');
}


export const clearStorage = () => {
    localStorage.clear();
}

export const getCode = () => {
    let accessCode = '';
    if(!accessCode) {
        const codeLong = copyCodeFromUrl();
        accessCode = shortenCode(codeLong);
    } else {
        return
    }
    return accessCode;
}


export const oauthLogin = () => {
    let jso = new JSO({
        providerID: "bexio",
        client_id: clientID,
        redirect_uri: "http://localhost:3000/",
        authorization: "https://office.bexio.com/oauth/authorize/",
        scopes: { request: ["article_show"]},
        response_type: 'code',
        client_secret: clientSecret,
        token: "https://office.bexio.com/oauth/access_token/",
        request: { state: '1234567890'}
    });
    jso.getToken();
}

const copyCodeFromUrl = () => {
    const accessCode = window.location.href.match(/code=([^&]*)/);
    return accessCode;
}

const shortenCode = (codeLong) => {
    const codeShort = codeLong.match("code=(.*),");
    const code = codeShort[1];
    return code;
}

export const getAccessToken = (code) => {
    
    //no 'access-control-allow-origin' header is present on the requested resource.

    let http = new XMLHttpRequest();
    const url = 'https://office.bexio.com/oauth/access_token/';
    const redirect_uri = 'http://localhost:3000/';

    const params = `client_id=${clientID}&redirect_uri=${redirect_uri}&client_secret=${clientSecret}&code=${code}`;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            const json = JSON.parse(http.responseText);
            const accessToken = json.access_token;
            const organisation = json.org;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('org', organisation);
            alert('got accessToken');
        }
    }
    http.send(params);
}

export const getArticles = () => {
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/'
    const organisation = localStorage.getItem('org');
    const accessToken = localStorage.getItem('access_token')
    const url = `${baseUrl}${organisation}/article`;
    http.open( "GET", url, true );
    http.setRequestHeader("Accept",'application/json');
    http.setRequestHeader("Authorization",`Bearer ${accessToken}`);

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            let articles = JSON.parse(http.responseText);
             console.log(articles);
        }
    }

    http.send();
}