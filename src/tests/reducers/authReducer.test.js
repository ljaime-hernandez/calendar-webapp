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
10. to have a clearer view of this single js test file, press p. then type the file name 'authReducer.test.js'
*/

import { types } from "../../types/types";
import { authReducer } from "../../reducers/authReducer";

const initState = {
    checking: true
};

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
});