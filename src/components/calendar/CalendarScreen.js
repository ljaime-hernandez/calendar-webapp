import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { NavBar } from '../ui/NavBar';
import 'moment/locale/es';

// uncomment for spanish mode
//import { messages } from '../../helpers/calendarMessagesEsp';

// uncomment for spanish mode
// moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
  title: 'Birthday Chikee',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  gbcolor: '#fafafa',
  notes: 'Buy a cake'
}]

export const CalendarScreen = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block'
    }

      return {
        style
      }
  };

  return (
    <div>
        <NavBar/>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          // uncomment for spanish mode
          // messages={messages}

        />
    </div>
  )
}
