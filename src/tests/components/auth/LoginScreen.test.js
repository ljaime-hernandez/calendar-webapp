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

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider
        store={store}
    >
        <LoginScreen/>
    </Provider>
)

describe('Tests on LoginScreen component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render properly', () => { 

        expect(wrapper).toMatchSnapshot();
    });

    test('should call login dispatch', () => { 

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

        act(() => {
            wrapper.find('form').at(0).prop('onSubmit')({
                preventDefault(){}
            });
        })

        expect(startLogin).toHaveBeenCalledWith('email@emaill.com', '122345');
    });

    test('should not register if password confirm does not match the password', () => {

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

        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault(){}
            });
        })

        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith('error', 'Password does not match with password confirmation', 'error');
    });

    test('should launch startRegister if passwords match', () => {

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

        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault(){}
            });
        });

        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith("Miguel", "email@email.com", "122345");
    });
});