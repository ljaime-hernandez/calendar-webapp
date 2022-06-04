import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { act } from '@testing-library/react';
import { Provider } from "react-redux";
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

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
let store = mockStore(initState);
store.dispatch = jest.fn();

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

        const calendar = wrapper.find('Calendar');

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });
        
        calendar.prop('onSelectEvent')({ start: 'Hello'});
        expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hello'});

        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
        })
    });
});