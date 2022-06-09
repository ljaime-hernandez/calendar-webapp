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
10. to have a clearer view of this single js test file, press p. then type the file name 'auth.test.js'
*/

import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';
import { startChecking, startLogin, startRegister } from '../../actions/auth';

// mock for the Swal function to test errors received from auth controllers in calendar backend 
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

// we need to create a mock function of the setItem in the localStorage used in the webapp
Storage.prototype.setItem = jest.fn();

// for our mockstore we need to configure its middleware as a normal store so thunk must be used
// as in a normal store
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// the initial state of the auth reducer will be empty but will be modified according to the
// required test
const initState = {};
let store = mockStore(initState);

describe('Tests on auth actions', () => {

    // some of our actions will require the mockStore to be restored to its initial
    // stage, so we use the beforeEach function to restore both the store and all 
    // jest mock functions. 
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('should execute startLogin properly', async() => { 

        await store.dispatch(startLogin('email@email.com', '122345'));
        const actions = store.getActions();

        // the action will retrieve both the type used for it to be 'casted' and the 
        // payload which is the information sent to the reducer, in this test we expect
        // the payload to be returned with any sort of string for both the uid and the name of the user
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        // the startLogin contains a step for the localStorage to both store the token
        // from the JWT and the date and time the token was stored, this tests will check for 
        // both steps to have been called
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

     test('should execute startLogin incorrectly', async() => { 

        await store.dispatch(startLogin('email@email.com', '122345214534'));
        let actions = store.getActions();

        // the action should be empty as in the startLogin function call, the password argument
        // does not match with any of the users in the mongo database
        expect(actions).toEqual([]);
        // sweetalert error popup should match in its arguments with the proper error code
        expect(Swal.fire).toHaveBeenCalledWith("error", "Wrong password, try again", "error");
        
        await store.dispatch(startLogin('email@email345.com', '122345'));
        actions = store.getActions();

        // the action should be empty as in the startLogin function call, the user argument
        // does not match with any of the users in the mongo database
        expect(actions).toEqual([]);
        // sweetalert error popup should match in its arguments with the proper error code
        expect(Swal.fire).toHaveBeenCalledWith("error", "User does not exist with that email", "error");
    });

    test('should execute startRegister properly', async() => { 

        // for the startRegister test, we need to do a mock function of the 
        // fetchWithoutToken, which we define with a fake token and dummy user
        // information
        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Miguel',
                    token: 'ABC3245321345673'
                }
            }
        }));

        await store.dispatch(startRegister('test', 'test@test.com', '123456'));
        const action = store.getActions();

        // we use both the startRegister action along with the fetchWithoutToken to return
        // the correct dispatch information, the user should have registered "properly" returning
        // our mock information stored in the action tested below
        expect(action[0]).toEqual({
            type: types.authStartRegister,
            payload: { uid: '123', name: 'Miguel' }
        });
        // the startRegister should have also launched the login action of the authReducer
        expect(action[1]).toEqual({
        type: types.authLogin,
        payload: { uid: '123', name: 'Miguel' }
        });
        // our localStorage mock should have stored both the dummy token and the date on which it was
        // stored in the localStorage.
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC3245321345673');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('should execute startChecking correctly', async() => { 

        // we use both the startChecking action along with the fetchWithToken to return
        // the correct dispatch information, if the user had a valid token then the request
        // should have returned information similar to the JSON object below, in this case we 
        // include a dummy token with dummy user information 
        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Miguel',
                    token: 'ABC3245321345673'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();

        // the startChecking should have also launched the login action of the authReducer if the token
        // was still valid
        expect(actions[1]).toEqual(
            { type: '[auth] Login', payload: { uid: '123', name: 'Miguel' }
        });
        // our localStorage mock should have stored both the dummy token and the date on which it was
        // stored in the localStorage.
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC3245321345673'); 
    });
});