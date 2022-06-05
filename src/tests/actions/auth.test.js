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

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import * as fetchModule from '../../helpers/fetch';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Tests on auth actions', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('should execute startLogin properly', async() => { 

        await store.dispatch(startLogin('email@email.com', '122345'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
     });

     test('should execute startLogin incorrectly', async() => { 

        await store.dispatch(startLogin('email@email.com', '122345214534'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("error", "Wrong password, try again", "error");

        await store.dispatch(startLogin('email@email345.com', '122345'));
        actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("error", "User does not exist with that email", "error");
      });

      test('should execute startRegister properly', async() => { 

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

            expect(action[0]).toEqual({
                type: types.authStartRegister,
                payload: { uid: '123', name: 'Miguel' }
              })
            expect(action[1]).toEqual({
            type: types.authLogin,
            payload: { uid: '123', name: 'Miguel' }
            })
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC3245321345673');
            expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
       })

       test('should execute startChecking correctly', async() => { 

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

            expect(actions[1]).toEqual(
                { type: '[auth] Login', payload: { uid: '123', name: 'Miguel' }
            })
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC3245321345673'); 
        })
})