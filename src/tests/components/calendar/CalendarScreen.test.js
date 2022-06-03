import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import '@testing-library/jest-dom';

// jest.mock('../../../actions/events', () => ({
//     eventStartDelete: jest.fn()
// }))

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
    })
})