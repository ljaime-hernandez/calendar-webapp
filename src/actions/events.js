import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { fixEvents } from "../helpers/fixEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {

    return async(dispatch, getState) => {
        
        // we use the getState to retrieve the uid and name in the store dispatched to our authReducer when
        // the user logged on its account
        const { uid, name } = getState().auth;

        try {

        // the fetchWithToken function is used as, for this request to work, an authorized user must be logged in, 
        // if the user is authenticated and the token is still valid, then the event data will go through some checks
        // on the backend middlewares, to finally be registered in our mongo database. The first argument will be the 
        // endpoint which is 'events' and the third argument must be a POST
            const res = await fetchWithToken('events', event, 'POST');
            const body = await res.json();
        
            console.log(body);

                // if the response is correct, then we will add the uid and name of the user for it to be used as reference
                // on the eventModal, which will help us register the event using this user as reference for whenever we want
                // to retrieve all events registered on it
                if(body.ok){
                    event.id = body.event.id;
                    event.user = {
                        _id: uid,
                        name: name
                    };
                    // the event information will be dispatched to an array of events which we will be able to track from the store
                    // if necessary
                    dispatch(eventAddNew(event));
                };
            
        } catch (error) {
            console.log(error);
        };
    };
};

export const eventStartLoading = () => {

    return async(dispatch) => {

        try {
            
            // The fetchWithToken will do a GET request by default and will use the endpoint to receive all the events
            // received from the calendar backend for them to later be displayed in the users calendar display.
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            // The start and end dates on the events might not work properly, so we need a helper for us to change the
            // dates registered in the mongo database and modify them with moment.js for us to use them properly
            const events = fixEvents(body.events);
            
            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error);
        };
    };
} ;

export const eventStartUpdate = (event) => {

    return async(dispatch) => {

        try {
            
            // this fetch will use the PUT as method to update the event by using its id and the events endpoint as
            // reference, if the event is found then the calendar backend will use a mongo method for the event to be
            // updated
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();


            if(body.ok) {
                dispatch(eventUpdated(event));
                dispatch(eventStartLoading());
            } else {
                // the error message displayed in the Sweetalert popup is retrieved from the calendar backend, 
                // which will be attached to the body response 
                Swal.fire('Error', body.msg, 'error');
            };

        } catch (error) {
            console.log(error);
        };
    };
};

export const eventStartDelete = () => {

    return async(dispatch, getState) => {

        // we use the getState to retrieve the id in the store dispatched to our calendarReducer when
        // the user clicks on an specific event
        const { id } = getState().calendar.activeEvent; 

        try {
            
            // Similar to the eventStartUpdate, this fetch will use the DELETE as method to delete the event by using 
            // its id and the events endpoint as reference, if the event is found then the calendar backend will use 
            // a mongo method for the event to be deleted and no additional event data needs to be sent as the deletion
            // only requires the id for it
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok) {
                dispatch(eventDeleted());
                dispatch(eventStartLoading());
                dispatch(eventClearActive());
            } else {
                // the error message displayed in the Sweetalert popup is retrieved from the calendar backend, 
                // which will be attached to the body response 
                Swal.fire('Error', body.msg, 'error');
            };
        } catch (error) {
            console.log(error);
        };
    };
};

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

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

const eventDeleted = () => ({
    type: types.eventDeleted
})

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({
    type: types.eventLogout
}) 