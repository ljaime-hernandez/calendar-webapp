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