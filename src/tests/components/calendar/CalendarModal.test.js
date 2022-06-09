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
10. to have a clearer view of this single js test file, press p. then type the file name 'LoginScreen.test.js'
*/

import 'jest-canvas-mock';
import '@testing-library/jest-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { act } from '@testing-library/react';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../../actions/events';

// mock for the Swal function to test errors received from CalendarModal component
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

// all actions used in this component test will be set as mock functions
jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn()
}));

// for our mockstore we need to configure its middleware as a normal store so thunk must be used
// as in a normal store
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// declaration of date variables with moment.js which will use the actual date and timeframe with 1 hour of difference
// so we can create a logical event
const now = moment().minutes(0).seconds(0).add(1,'hours');
const firstEnd = moment().minutes(0).seconds(0).add(2,'hours');

// the CalendarModal component can only be tested when the store contains and specifically structured state, so i
// had to create a fake on which will have no events in its array but has an activeEvent selected, this portion of the
// webpage can only be accessed with an authorized user so the auth portion of the initial state object must be filled
// appropriately and, as we are testing the modal, it should be open with our ui value on a true state
const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Test title',
            notes: 'Test note',
            start: now.toDate(),
            end: firstEnd.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Miguel'
    },
    ui: {
        modalOpen: true
    }
};

// the initial state of the stor will be then filled with the prefixed initial state
let store = mockStore(initState);
store.dispatch = jest.fn();

// the Provider component will allow us to mount the whole webapp mock requirements for the
// CalendarModal component to be tested accordingly
const wrapper = mount(
    <Provider
        store={store}
    >
        <CalendarModal/>
    </Provider>
)

describe('Tests on CalendarModal component', () => {

    // some of our actions will require the mockStore to be restored to its initial
    // stage, so we use the beforeEach function to restore both the store and all 
    // jest mock functions. 
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render properly', () => {

        // the initial test on this component its different as the initial state 
        // will always be changing due to the dates used with moment.js, the screenshot
        // would always be wrong and, besides that, the Calendar component from the exported
        // big-react-calendar library has its own technical team of support, so whats being 
        // tested initially here is if all the requirements are fulfilled for the CalendarModal
        // to popup properly
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });

    test('should call update action and close modal', () => { 

        // as the initialState already contains and activeEvent with default information, 
        // we simulate the submission of its form 
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        // the eventStartUpdate should match with the activeEvent attribute of the calendar
        // reducer
        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        // after the update is run correctly, the activeEvent must be set to null if the event
        // was properly saved
        expect(eventClearActive).toHaveBeenCalled();
    });

    test('should display error if title is missing', () => { 

        // on the beforeEach function portion of our tests, we are resetting the actions but
        // not the initial state of the store, this means the first test will affect the second and
        // so on, the previous test was for the update of an activeEvent and the eventClearActive
        // function should have set that value to null, this new submission must have not succeeded
        // as the information was empty so we test for the input class of the title to be invalid
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);

    });

    test('should create a new event', () => { 

        // as the previous test changed the className of one of the inputs and the tests were mixed,
        // we do a different approach by setting every step from scratch all contained in this
        // test portion, the initialState will not have any events on its array and the activeEvent will
        // be null, the modal is open so the user is set to create a new event instead of updating an
        // old one
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
                modalOpen: true
            }
        };
        
        let store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider
                store={store}
            >
                <CalendarModal/>
            </Provider>
        );

        // the only input we need to modify is the title as the modal default
        // values for initial and final date are 'legal', the notes input is optional
        // so thats why just a title is necessary
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Title test'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        // the expect values for the dates are set to "anything", thats because if we
        // put a "Date" it might not work properly, as we modify the dates value for them to 
        // be stored with moment.js.
        expect(eventStartAddNew).toHaveBeenCalledWith({
            "end": expect.anything(), 
            "notes": "", 
            "start": expect.anything(),
             "title": "Title test"
        });
        // after the event save is run correctly, the activeEvent must be set to null if the event
        // was properly saved
        expect(eventClearActive).toHaveBeenCalled();
    });

    test('should validate dates', () => { 

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Date test'
            }
        });

        // the "today value" will be replaced with the second DateTimePicker value, which is
        // supposed to differ from one hour to the start date, this should give us an error
        const today = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        // the error should popup with the body message specified in the CalendarModal component
        // and it should match with the test
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Second date should be greater than first date", "error");
    });
});