import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import * as fetchModule from '../../helpers/fetch';
import { startLogin, startRegister } from '../../actions/auth';
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

       
})