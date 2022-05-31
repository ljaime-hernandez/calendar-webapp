
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import { AppRouter } from '../../routers/AppRouter';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        checking: true
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Tests on AppRouter component', () => {
    
    test('should render h1 default component', () => { 
        
        const initState = {
            auth: {
                checking: true
            }
        };

        let store = mockStore(initState);

        const wrapper = mount(
            <Provider
                store={store}
            >
                <AppRouter/>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').exists()).toBe(true);
    });

    test('should render public routes', () => { 
        
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        
        let store = mockStore(initState);

        const wrapper = mount(
            <Provider
                store={store}
            >
                <AppRouter/>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.container').exists()).toBe(true);
    });

    test('should render private routes', () => { 
        
        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'Miguel'
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            ui: {
                modalOpen: false
            }
        };
        
        let store = mockStore(initState);

        const wrapper = mount(
            <Provider
                store={store}
            >
                <AppRouter/>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);
    });
})