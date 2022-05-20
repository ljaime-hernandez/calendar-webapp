import 'moment/locale/es';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { NavBar } from '../ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

// uncomment for spanish mode
//import { messages } from '../../helpers/calendarMessagesEsp';

// uncomment for spanish mode
// moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.auth);
  const { events, activeEvent } = useSelector( state => state.calendar );
  const [ lastView, setLastView ] = useState(localStorage.getItem( 'lastView') || 'month' );

  useEffect(() => {
    
    dispatch(eventStartLoading());

  }, [dispatch])
  

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem( 'lastView' , e );
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActive())
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
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
          onSelectSlot={onSelectSlot}
          selectable={true}
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

        {
          activeEvent && <DeleteEventFab/>
        }

    </div>
  )
}
