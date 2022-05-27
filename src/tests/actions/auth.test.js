import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = { thunk };
const mockStore = configureMockStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Tests on auth actions', () => {

    beforeEach(() => {
        store = mockStore(initialState);
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
     })
})