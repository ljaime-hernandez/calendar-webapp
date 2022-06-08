import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { startChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {

  const dispatch = useDispatch();
  // as soon as the webapp is launched, the useSelector will try to retrieve the checking status of
  // the page and the users uid, if the uid exists then the user will be redirected to the PrivateRoute
  // by default which is the '/' or home of the page, if the uid does not exists then the user will be
  // sent to the /login portion of the page to either introduce its credentials or create a user
  const { checking, uid } = useSelector( state => state.auth );

  useEffect(() => {
    
    // the useEffect will automatically dispatch a request to our calendar backend to check for 
    // 'communication' with the server, if it does not reach it, then the page will display an
    // h1 tag with a 'Wait' message which will only change after the server is back online
    dispatch(startChecking());

  }, [dispatch]);

  if(checking){
    return (<h1>Wait...</h1>);
  }
  
  return (
    <BrowserRouter>
            <div>
              <Routes>

                <Route path="/login" element={
                  <PublicRoute uid={uid}>
                    <LoginScreen/>
                  </PublicRoute>
                }/>

                <Route path="/*" element={
                  <PrivateRoute uid={uid}>
                    <CalendarScreen/>
                  </PrivateRoute>
                }/>

              </Routes>
            </div>
        </BrowserRouter>
  )
}
