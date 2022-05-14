import { fetchWithoutToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startLogin = (email, password) => {
    
    return async() => {
        const resp = await fetchWithoutToken('auth', {email, password}, 'POST');

        const body = await resp.json();

        console.log(body);
    }
}