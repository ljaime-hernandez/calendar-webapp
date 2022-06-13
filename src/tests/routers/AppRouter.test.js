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
10. to have a clearer view of this single js test file, press p. then type the file name 'AppRouter.test.js'
*/

import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { AppRouter } from '../../routers/AppRouter';

// for our mockStore we need to configure its middleware as a normal store so thunk must be used
// as in a normal store
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// the initial state of the auth reducer will be empty but will be modified according to the
// required test
const initState = {
    auth: {
        checking: true
    }
};

// the initial state of the store will be then filled with the prefixed initial state
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
        // the snapshot should display an h1 tag with a 'Wait' message as the default
        // initialState for this test is not communicating with the calendar backend
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
        );

        // the snapshot should display a LoginScreen component with a container class as the default
        // initialState for this test is emulating the communication with the calendar backend, we can
        // also test with any of the classes or elements present on the LoginScreen component
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

        // the snapshot should display a CalendarScreen component with a navbar class as the default
        // initialState for this test is emulating the communication with the calendar backend on an
        // authorized user, we can also test with any of the classes or elements present on the 
        // NavBar component
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);
    });
});