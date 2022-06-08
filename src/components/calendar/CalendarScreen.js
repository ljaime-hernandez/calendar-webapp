import 'moment/locale/es';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { NavBar } from '../ui/NavBar';
import { AddNewFab } from '../ui/AddNewFab';
import { uiOpenModal } from '../../actions/ui';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { eventClearActive, eventSetActive, eventStartLoading } from '../../actions/events';

// uncomment for spanish mode
//import { messages } from '../../helpers/calendarMessagesEsp';

// uncomment for spanish mode
// moment.locale('es');

// the localizer will be used along with the momentLocalizer function for our calendar to know which localization
// we are using for the calendar to save and render the information accordingly, helpful feature for applications
// used on different global territories
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  
  const dispatch = useDispatch();
  // we retrieve the uid of the logged user to compare it with each event created in the calendar, the calendar
  // will display all events created by any user, and the events will be rendered with certain color only if
  // the actual user created them, so it will be blue for events created by the actual user or gray for events
  // created by others
  const { uid } = useSelector(state => state.auth);
  // the events object is retrieved so we can separate the events created by the logged user and the ones created
  // by others as one of the attributes in them includes the name and the users uid. The activeEvent will be used
  // for us to render or not the DeleteEventFab component for specific operations
  const { events, activeEvent } = useSelector( state => state.calendar );
  // we retrieve the lastView value from the localStorage for the calendar to display the respective view, which is going to be
  // either the month, week, day or agenda. The default view on our calendar will always be the month, so thats what the user
  // will see first whenever it connects onto the page
  const [ lastView, setLastView ] = useState(localStorage.getItem( 'lastView') || 'month' );

  useEffect(() => {
    
    // as the CalendarScreen is rendered, it will automatically dispatch a function to load all the events
    // on our mongo database, and will also clear any active events if necessary.
    dispatch(eventStartLoading());
    dispatch(eventClearActive())
  }, [dispatch])
  

  const onDoubleClick = (e) => {
    // if we double click in any of the events on the calendar, the modal will display the modal. The modal
    // has an additional filter for it to display either the empty form on it or the actual event information
    // clicked
    dispatch(uiOpenModal());
  }

  const onSelect = (e) => {
    // if we click once in any event, it will be dispatched in our store respectively for the reducer to
    // set it as active, useful for us to check the information contained on it or for us to update it
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    // whenever we click on any of the views on the calendar (month, week, day or agenda), the CalendarScreen
    // view will change and we will also save its actual value in our localStorage
    setLastView(e);
    localStorage.setItem( 'lastView' , e );
  }

  const onSelectSlot = (e) => {
    // feature used to deactivate any activeEvent by clicking anywhere else on the screen
    dispatch(eventClearActive())
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    // event styling changing colors from blue to gray depending if the logged user created the event or not
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

        {/* modal will only be displayed if the modalOpen value is active */}
        <CalendarModal/>
        {/* button used for the user to add new events, this button will maintain the activeEvent value
            as null, so the modal will save the event as a new one */}
        <AddNewFab/>

        {
          /* The DeleteEventFab button will only be displayed if an activeEvent is selected, if not it will just be
             a hidden component */
          activeEvent && <DeleteEventFab/>
        }
    </div>
  )
}
