import { types } from "../types/types";

// this initialState on the authReducer will be used along with the startChecking action in the AppRouter
// component for us to test the connection with the backend portion of the webapp, if theres no connection
// then the webapp will render a "Wait" message not allowing us to do any action on the page, this is so
// both the users and the developers know when the webpage is down
const initialState = {
    checking: true
}

export const authReducer = ( state = initialState, action ) => {

    switch (action.type) {
    
        case types.authLogin: 
        
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authStartRegister: 
        
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckDone: 
        
            return {
                ...state,
                checking: false
            }

        case types.authLogout:

        return {
            checking: false
        }

        default:
            return state;
    }
}