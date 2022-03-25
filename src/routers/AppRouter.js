import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { DashboardRoutes } from './DashboardRoute'

export const AppRouter = () => {
  return (
    <BrowserRouter>
            <div>
                <Routes>

                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/*" element={<DashboardRoutes/>}/>
                </Routes>
            </div>
        </BrowserRouter>
  )
}
