/* to run this test:
1. run the 'npm install' command from the calendar-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. make sure you are running the calendar-backend as some tests depends on it
9. run the command 'npm run test'
10. to have a clearer view of this single js test file, press p. then type the file name 'fetch.test.js'
*/

import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch"

describe('Tests on fetch helper', () => {

    let token = '';

    test('FetchWithoutToken should return proper information', async() => {

        // we are simulating a login request by using the 'auth' endpoint, an data object with valid
        // email and password credentials and a POST request to the calendar backend server, the response
        // will contain a token which we will use on the next test
        const resp = await fetchWithoutToken('auth', {email: 'email@email.com', password: '122345'}, 'POST');
        const body = await resp.json();
        
        token = body.token;
        
        // we test the resp to be an instance of a Response type and the value of the body.ok to be true
        expect(resp instanceof Response).toBe(true);
        expect(body.ok).toBe(true);

    });

    test('FetchWithToken should return proper information', async() => {

        // after we receive the response, the token should be stored in the localStorage, we will save it
        // so we can test the fetchWithToken function
        localStorage.setItem('token', token);

        // the function is called with an endpoint concatenated with an INVALID event id, as the request is
        // of DELETE nature, we dont need any extra data on it and the request is of course of type
        // DELETE
        const resp = await fetchWithToken('events/6271ef96e06f32bf9134e212', {}, 'DELETE');
        const body = await resp.json();

        // the backend will look for an event with the previous id, which does not exist, what we test is the
        // body message containing the proper error response
        expect(body.msg).toBe('Event does not exist');
    });
});
