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
10. to have a clearer view of this single js test file, press p. then type the file name 'CalendarScreen.test.js'
*/

import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { act } from '@testing-library/react';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

// all actions used in this component test will be set as mock functions
jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

// we need to create a mock function of the setItem in the localStorage used in the webapp
Storage.prototype.setItem = jest.fn();

// for our mockStore we need to configure its middleware as a normal store so thunk must be used
// as in a normal store
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// the CalendarScreen component can only be tested when the store contains and specifically structured state, so i
// had to create a fake on which will have no events in its array and a null activeEvent, this portion of the
// webpage can only be accessed with an authorized user so the auth portion of the initial state object must be filled
// appropriately and, as we are testing the calendar, the modal should be closed
const initState = {
    calendar: {
        events: [],
        activeEvent: null
    },
    auth: {
        uid: '123',
        name: 'Miguel'
    },
    ui: {
        openModal: false
    }
};

// the initial state of the store will be then filled with the prefixed initial state
let store = mockStore(initState);
store.dispatch = jest.fn();

// the Provider component will allow us to mount the whole webapp mock requirements for the
// CalendarScreen component to be tested accordingly
const wrapper = mount(
    <Provider
        store={store}
    >
        <CalendarScreen/>
    </Provider>
)

describe('Tests on CalendarScreen component', () => {

    test('should render properly', () => { 

        expect(wrapper).toMatchSnapshot();
    });

    test('tests with calendar interactions', () => {

        // the CalendarScreen component contains a child component called Calendar, which we
        // use by using the react-big-calendar library, the Calendar contains a lot of properties
        // which are the ones tested
        const calendar = wrapper.find('Calendar');

        // when doubleClicking an event, the store will use the uiReducer to change the modalOpen
        // value to true, which should popup the CalendarModal component
        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });
        
        // when onSelectEvent is launched, it will use whatever information was used on it and set it
        // as part of an activeEvent, as this test was called with an object with an 'start' attribute
        // with a value then thats what should have  been used on the eventSetActive action
        calendar.prop('onSelectEvent')({ start: 'Hello'});
        expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hello'});

        // the act function will simulate the form submission on React components 
        // in the webpage accordingly, whenever the test requires it, the compiler
        // sends a concrete error message stating where this function needs to be called
        act(() => {
            // for the Calendar component to change, we use the localStorage to store the
            // value of the view we want to see and the calendar will retrieve it from it and
            // change accordingly, in this test we trigger the view for the 'week' and thats
            // what should have been stored on the lastView item in the localStorage
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
        })
    });
});