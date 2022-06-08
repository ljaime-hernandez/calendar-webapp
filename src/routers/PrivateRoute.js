import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children, uid}) => {

    // The PrivateRoute component will check of uid existence, if the value
    // is not null then the user will be sent to its 'children' component which 
    // is the CalendarScreen page, if not the user will be redirected to the 
    // LoginScreen page
    return !!uid
        ?  children
        :  <Navigate to="/login"/>
}