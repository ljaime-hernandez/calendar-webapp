import moment from 'moment';
import { types } from '../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Birthday Chikee ',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        gbcolor: '#fafafa',
        notes: 'Buy a cake',
        user: {
          _id: '1234',
          name: 'Miguel'
        }
      }

    ],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventAddNew:
            
            return {
                ...state,
                events: [action.payload, ...state.events]
            };

        case types.eventSetActive:
        
            return {
                ...state,
                activeEvent: action.payload
            };

        case types.eventClearActive:
            
            return {
                ...state,
                activeEvent: null
            };

        case types.eventDelete:
            
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            };

        default:
            return state;
    }
}