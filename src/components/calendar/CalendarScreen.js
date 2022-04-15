import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { NavBar } from '../ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/es';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

// uncomment for spanish mode
//import { messages } from '../../helpers/calendarMessagesEsp';

// uncomment for spanish mode
// moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  
  const dispatch = useDispatch();
  const {events} = useSelector( state => state.calendar );
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelect = (e) => {
    dispatch(eventSetActive(events));
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
        <AddNewFab/>

    </div>
  )
}
