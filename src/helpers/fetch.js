
// when testing the webapp, the url used would be http://localhost:4000/api as thats the one i use along with
// MongoDB Compass for quick checking of the API processes, when the webapp is deployed to production the URL
// changes to https://calendar-backend-webapp.herokuapp.com/api as i mounted the calendar backend onto the heroku
// server
const baseUrl = process.env.REACT_APP_API_URL;

// Receives the endpoint which will be the "additional" portion of the webpage which we will use as reference
// for whatever process we need to do either to authorize or to modify events.
// The data will be either the user information or the event object and the method will be 'GET' by default, but
// the backend also supports 'PUT', 'POST' and 'DELETE'
const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {

    // concatenates the url with the endpoint received in the request call
    const url = `${baseUrl}/${endpoint}`;

    if(method === 'GET') {
        // if the request is 'GET' by default, we just need to send a request to receive a response in return
        return fetch(url);
    } else {
        // if the request is not 'GET', then we have to specify that the information we are sending is of type
        // JSON, so the formatting of the data is properly sent
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };
};

// Receives the endpoint which will be the "additional" portion of the webpage which we will use as reference
// for whatever process we need to do either to authorize or to modify events.
// The data will be either the user information or the event object and the method will be 'GET' by default, but
// the backend also supports 'PUT', 'POST' and 'DELETE'
const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

    // concatenates the url with the endpoint received in the request call
    const url = `${baseUrl}/${endpoint}`;
    // some of the requests requires proper authorization, every login process will store the
    // token into the localStorage, so this function will retrieve it from the token portion of the
    // storage
    const token = localStorage.getItem('token') || '';

    if(method === 'GET') {
        // if the request is 'GET' by default, we just need to send a request to receive a response in return
        // along with the token for the proper authorization process
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        // if the request is not 'GET', then we have to specify that the information we are sending is of type
        // JSON, so the formatting of the data is properly sent along with the token for the proper authorization
        // process
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    };
};

export {
    fetchWithoutToken,
    fetchWithToken
};