import {Routes} from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const DashboardRoutes = () => {
    return (
        <>
        <div className='container'>
        
        <CalendarScreen/>

        <h1>Dashboard</h1>
            <Routes>
                
            </Routes>
        </div>
        </>
    )
}