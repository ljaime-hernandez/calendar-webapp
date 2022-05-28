
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
    checking: true
}

describe('Tests on authReducer', () => {

    test('should return initialState', () => { 

        const action = {};
        const state = authReducer(initState, action);

        expect(state).toEqual(initState);
    });

    test('should authenticate user', () => { 
    
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Miguel'
            }
        };
        const state = authReducer(initState, action);

        expect(state).toEqual({ checking: false, uid: '123', name: 'Miguel' });
    });

    test('should logout properly', () => { 

        const action = {type: types.authLogout};
        const state = authReducer(initState, action);

        expect(state).toEqual({ checking: false });
    });

    test('should return register state', () => { 

        const action = {
            type: types.authStartRegister,
            payload: {
                uid: '123',
                name: 'Miguel'
            }
        };
        const state = authReducer(initState, action);

        expect(state).toEqual({  checking: false, uid: '123', name: 'Miguel' });
    });
})