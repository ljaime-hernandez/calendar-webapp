import { types } from '../types/types';

const initialState = {
    events: [],
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

        case types.eventLoaded:

            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventLogout:

            return {
                ...initialState
            }

        default:
            return state;
    }
}