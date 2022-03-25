import { useContext } from "react";
import {Navigate, useLocation} from 'react-router-dom';
import { AuthContext } from "../auth/authContext";

export const PrivateRoute = ({children}) => {

    // we use the context to retrieve the user values kept on the localStorage, if any
    const {user} = useContext(AuthContext);
    // the useLocation hook will retrieve the path being used by the user while logged
    // in, we destructure both the pathname, which is going to be any of the private
    // components accessible for the logged user, and, in case the user is also doing
    // a query by searching on our search component, the search variable will be then
    // concatenated to the actual pathname for the user to go straight to the same
    // page where he left before login out
    const {pathname, search} = useLocation();

    // this string on the lastPath item is going to constantly be updated dynamically
    // while the user is navigating our page
    localStorage.setItem('lastPath', pathname + search);

    // the children in this condition is the component inside our PrivateRoute component
    // which is the DashboardRoutes, as it is contained within it, we can use them as an
    // argument which will be returned if the user logged property is true. If not, we use 
    // the Navigate component from react-router-dom to return the user to the login page
    return user.logged
        ?  children
        :  <Navigate to="/login"/>
}