import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
    
    return async(dispatch) => {

        // the fetchWithoutToken function is used as the user is not logged in and we are about to create a token
        // for it if the user exists in our database, the first argument will be the endpoint which is the
        // auth and the third argument must be a POST
        const resp = await fetchWithoutToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        // if we receive the correct response, we will use the localStorage to temporarily place our received token,
        // by default the token will last for 2 hours, but it can be renewed with some of the functions created on our
        // calendar, we also place the specific time where the token was placed in the token-init-date portion of the
        // localStorage to know if the token is still valid.
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // the dispatch will be sent to the store for it to be registered on the reducer
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));

        } else {
            // the error message displayed in the Sweetalert popup is retrieved from the calendar backend, 
            // which will be attached to the body response 
            Swal.fire('error', body.msg, 'error');
        };
    };
};

// The startRegister function will not only register a new user on the database but it will also 
// automatically log the user in.
export const startRegister = (name, email, password) => {

    return async(dispatch) => {

        // The fetchWithoutToken function is used as the user is not logged in and we are about to create a token
        // for it. The first argument will be the endpoint which is the auth/new and the third argument must be a POST
        const resp = await fetchWithoutToken('auth/new', {name, email, password}, 'POST');
        const body = await resp.json();

        // If we receive the correct response, we will use the localStorage to temporarily place our received token,
        // by default the token will last for 2 hours, but it can be renewed with some of the functions created on our
        // calendar, we also place the specific time where the token was placed in the token-init-date portion of the
        // localStorage to know if the token is still valid.
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(register({
                uid: body.uid,
                name: body.name
            }));

            // the dispatch will be sent to the store for it to be registered on the reducer
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));

        } else {
            // the error message displayed in the Sweetalert popup is retrieved from the calendar backend, 
            // which will be attached to the body response 
            Swal.fire('Error', body.msg, 'error');
        };
    };
};

export const startChecking = () => {

    return async(dispatch) => {

        // the endpoint of the fethWithToken uses the renew portion of it for the user to retrieve an updated token for the 
        // user to continue its operations on the webapp for a longer period of time
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        // If we receive the correct response, we will use the localStorage to temporarily place our received token,
        // by default the token will last for 2 hours, but it can be renewed with some of the functions created on our
        // calendar, we also place the specific time where the token was placed in the token-init-date portion of the
        // localStorage to know if the token is still valid.
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(checkDone());
            // the dispatch will be sent to the store for it to be registered on the reducer
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkDone());
        };
    };
};

export const startLogout = () => {

    return (dispatch) => {

        // once the user logs out, we will clean every piece of information from the localStorage
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const register = (user) => ({
    type: types.authStartRegister,
    payload: user
})

const checkDone = () => ({type: types.authCheckDone});

const logout = () => ({type: types.authLogout});