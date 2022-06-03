import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';

// jest.mock('../../../actions/events', () => ({
//     eventSetActive: jest.fn(),
//     eventStartLoading: jest.fn()
// }))

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
            end: firstEnd.toDate
        }
    },
    auth: {
        uid: '123',
        name: 'Miguel'
    },
    ui: {
        modalOpen: false
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

    test('should render properly', () => {

        expect (wrapper.find('Modal').prop('isOpen')).toBe(true);
    });
});