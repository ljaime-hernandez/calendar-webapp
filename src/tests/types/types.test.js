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
10. to have a clearer view of this single js test file, press p. then type the file name 'types.test.js'
*/

import { types } from "../../types/types"

describe('Tests on types file', () => {

    test('should return types object', () => { 

        expect(types).toEqual({

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',

            eventAddNew: '[event] Add new',
            eventStartAddNew: '[event] Start add new',
            eventSetActive: '[event] Set active',
            eventClearActive: '[event] Clear active',
            eventUpdated: '[event] Updated',
            eventDeleted: '[event] Deleted',
            eventLoaded: '[event] Load events',
            eventLogout: '[event] clean events',

            authCheckDone: '[auth] Finish check login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authTokenRenew: '[auth] Token renew',
            authLogout: '[auth] logout'
        });
     });
});