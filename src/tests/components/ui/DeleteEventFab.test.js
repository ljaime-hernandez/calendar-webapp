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
10. to have a clearer view of this single js test file, press p. then type the file name 'DeleteEventFab.test.js'
*/

import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { eventStartDelete } from '../../../actions/events';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';

// all actions used in this component test will be set as mock functions
jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

// for our mockStore we need to configure its middleware as a normal store so thunk must be used
// as in a normal store
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// the initial state of the auth reducer will be empty but will be modified according to the
// required test
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

// the Provider component will allow us to mount the whole webapp mock requirements for the
// DeleteEventFab component to be tested accordingly
const wrapper = mount(
    <Provider
        store={store}
    >
        <DeleteEventFab/>
    </Provider>
);

describe('Tests on DeleteEventFab component', () => {

    test('should render properly', () => { 

        expect(wrapper).toMatchSnapshot();
    });

    test('should call EventStartDelete on click', () => { 

        wrapper.find('button').prop('onClick')();
        expect(eventStartDelete).toHaveBeenCalled();
    });
})