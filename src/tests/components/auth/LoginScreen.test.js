import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';


jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn()
}))

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

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

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
    })

})