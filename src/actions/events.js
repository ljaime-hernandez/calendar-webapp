import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {

    return async(dispatch) => {
        
        const res = await fetchWithToken('events', event, 'POST');
        const body = await res.json();

        console.log(body);
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