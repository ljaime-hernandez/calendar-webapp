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

import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import moment from 'moment';
import Swal from 'sweetalert2';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../../actions/events';
import { act } from '@testing-library/react';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1,'hours');
const firstEnd = moment().minutes(0).seconds(0).add(2,'hours');

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

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider
        store={store}
    >
        <CalendarModal/>
    </Provider>
)

describe('Tests on CalendarModal component', () => {

beforeEach(() => {
    jest.clearAllMocks();
});

    test('should render properly', () => {

        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });

    test('should call update action and close modal', () => { 

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActive).toHaveBeenCalled();
    });

    test('should display error if title is missing', () => { 

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);

    });

    test('should create a new event', () => { 

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

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Title test'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            "end": expect.anything(), 
            "notes": "", 
            "start": expect.anything(),
             "title": "Title test"
        });
        expect(eventClearActive).toHaveBeenCalled();
    });

    test('should validate dates', () => { 

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Date test'
            }
        });

        const today = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "Second date should be greater than first date", "error");
    });
});