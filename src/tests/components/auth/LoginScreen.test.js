/* to run this test:
1. run the 'npm install' command from the calendar-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. make sure you are running the calendar-backend as some tests depends on it
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'LoginScreen.test.js'
*/

import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { act } from '@testing-library/react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

// all actions used in this component test will be set as mock functions
jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn(),
}));

// mock for the Swal function to test errors received from LoginScreen component
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));


// for our mockstore we need to configure its middleware as a normal store so thunk must be used
// as in a normal store
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// the initial state of the auth reducer will be empty but will be modified according to the
// required test
const initState = {};
let store = mockStore(initState);
// in this test file the dispatch just needs to be fixed as a mock action.
store.dispatch = jest.fn();

// the Provider component will allow us to mount the whole webapp mock requirements for the
// LoginScreen component to be tested accordingly
const wrapper = mount(
    <Provider
        store={store}
    >
        <LoginScreen/>
    </Provider>
)

describe('Tests on LoginScreen component', () => {

    // some of our actions will require the mockStore to be restored to its initial
    // stage, so we use the beforeEach function to restore both the store and all 
    // jest mock functions. 
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render properly', () => { 

        expect(wrapper).toMatchSnapshot();
    });

    test('should call login dispatch', () => { 

        // simulate a change in both loginEmail and loginPassword values of the login form 
        // input
        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'email@emaill.com'
            }
        });
        wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: '122345'
            }
        });

        // the act function will simulate the form submission on React components 
        // in the webpage accordingly, whenever the test requires it, the compiler
        // sends a concrete error message stating where this function needs to be called
        act(() => {
            wrapper.find('form').at(0).prop('onSubmit')({
                preventDefault(){}
            });
        })

        expect(startLogin).toHaveBeenCalledWith('email@emaill.com', '122345');
    });

    test('should not register if password confirm does not match the password', () => {

        // simulate a change in both registerPassword and registerConfirmPassword values of the 
        // register form input. In this case, the passwords dont match so there should be an appropriate
        // error procedure in the form tested
        wrapper.find('input[name="registerPassword"]').simulate('change', {
            target: {
                name: 'registerPassword',
                value: 'email@emaill.com'
            }
        });
        wrapper.find('input[name="registerConfirmPassword"]').simulate('change', {
            target: {
                name: 'registerConfirmPassword',
                value: '122345'
            }
        });

        // the act function will simulate the form submission on React components 
        // in the webpage accordingly, whenever the test requires it, the compiler
        // sends a concrete error message stating where this function needs to be called
        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault(){}
            });
        })

        // the startRegister should not be called as the passwords in both inputs dont match
        expect(startRegister).not.toHaveBeenCalled();
        // sweetalert error popup should match in its arguments with the proper error code
        expect(Swal.fire).toHaveBeenCalledWith('error', 'Password does not match with password confirmation', 'error');
    });

    test('should launch startRegister if passwords match', () => {

        // simulate a change in both registerPassword and registerConfirmPassword values of the 
        // register form input. In this case, the passwords  match so there should be an appropriate
        // procedure in the form tested
        wrapper.find('input[name="registerPassword"]').simulate('change', {
            target: {
                name: 'registerPassword',
                value: '122345'
            }
        });
        wrapper.find('input[name="registerConfirmPassword"]').simulate('change', {
            target: {
                name: 'registerConfirmPassword',
                value: '122345'
            }
        });

        // the act function will simulate the form submission on React components 
        // in the webpage accordingly, whenever the test requires it, the compiler
        // sends a concrete error message stating where this function needs to be called
        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault(){}
            });
        });

        // the sweetalert popup should not be called as the passwords in both inputs match
        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith("Miguel", "email@email.com", "122345");
    });
});