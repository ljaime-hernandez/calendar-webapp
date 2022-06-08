import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children, uid }) => {

    // the PublicRoute component will check of uid existence, if the value
    // is not null then the user will be redirected to the home page, if not it will
    // return to the PublicRoute 'children' component which is the LoginScreen page
    return !!uid
        ?  <Navigate to="/"/>
        :  children
}