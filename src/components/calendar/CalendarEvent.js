import React from 'react'

// small component used for us to decide which piece of information in the event we want to display on the 
// calendar, in this case we only display the user name and title
export const CalendarEvent = ({event}) => {

    const {title, user} = event;

  return (
    <div>
        <strong>{title}</strong>
        <br></br>
        <span>{user.name}</span>
    </div>
  )
}
