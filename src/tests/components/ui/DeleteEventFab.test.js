import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import '@testing-library/jest-dom';
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider
        store={store}
    >
        <DeleteEventFab/>
    </Provider>
)

describe('Tests on DeleteEventFab component', () => {

    test('should render properly', () => { 

        expect(wrapper).toMatchSnapshot();
    });

    test('should call EventStartDelete on click', () => { 

        wrapper.find('button').prop('onClick')();
        expect(eventStartDelete).toHaveBeenCalled();
    });
})