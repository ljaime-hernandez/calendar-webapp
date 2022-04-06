import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { NavBar } from '../ui/NavBar';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

// uncomment for spanish mode
//import { messages } from '../../helpers/calendarMessagesEsp';

// uncomment for spanish mode
// moment.locale('es');

const localizer = momentLocalizer(moment);
const events = [{
  title: 'Birthday Chikee ',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  gbcolor: '#fafafa',
  notes: 'Buy a cake',
  user: {
    _id: '1234',
    name: 'Miguel'
  }
}]

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    console.log(e)
  }

  const onSelect = (e) => {
    console.log(e)
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
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
          style={{ height: 700 }}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
          view={lastView}
          components={{
            event: CalendarEvent
          }}
          // uncomment for spanish mode
          // messages={messages}

        />

        <CalendarModal/>
    </div>
  )
}
