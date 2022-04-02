import React from 'react';
import { NavBar } from '../ui/NavBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const events = [{
  title: 'Birthday Chikee',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  gbcolor: '#fafafa'
}]

export const CalendarScreen = () => {
  return (
    <div>
        <NavBar/>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
        />
    </div>
  )
}
