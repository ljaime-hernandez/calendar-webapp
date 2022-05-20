import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = (email, password) => {
    
    return async(dispatch) => {
        const resp = await fetchWithoutToken('auth', {email, password}, 'POST');

        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        } else {
            Swal.fire('error', body.msg, 'error');
        }
    }
}

export const startRegister = (name, email, password) => {
    return async(dispatch) => {

        const resp = await fetchWithoutToken('auth/new', {name, email, password}, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(register({
                uid: body.uid,
                name: body.name
            }))

        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(checkDone());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkDone());
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
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