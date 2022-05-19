import { fetchWithToken } from "../helpers/fetch";
import { fixEvents } from "../helpers/fixEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {

    return async(dispatch, getState) => {
        
        const { uid, name } = getState().auth;

        try {
            const res = await fetchWithToken('events', event, 'POST');
            const body = await res.json();
        
            console.log(body);

                if(body.ok){
                    event.id = body.event.id;
                    event.user = {
                        _id: uid,
                        name: name
                    }

                    dispatch(eventAddNew(event));
                }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            const events = fixEvents(body.events);
            
            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
} 

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () => ({
    type: types.eventClearActive
});

export const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventDeleted = () => ({
    type: types.eventDelete
})

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})