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

        const resp = await fetchWithoutToken('auth', {email: 'email@email.com', password: '122345'}, 'POST');
        const body = await resp.json();
        
        token = body.token;
        
        expect(resp instanceof Response).toBe(true);
        expect(body.ok).toBe(true);

    });

    test('FetchWithToken should return proper information', async() => {

        localStorage.setItem('token', token);

        const resp = await fetchWithToken('events/6271ef96e06f32bf9134e212', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Event does not exist');

    })
})
