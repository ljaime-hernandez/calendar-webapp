import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import moment from 'moment';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActive, eventStartUpdate } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActive: jest.fn()
}))

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
});