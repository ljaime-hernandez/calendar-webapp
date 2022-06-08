import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {
    
    const dispatch = useDispatch();
    // The click event on this component will trigger a delete request on our calendar backend for the activeEvent
    // to be deleted, for more information on how this function works please refer to the events action file
    const handleDelete = () => {
        dispatch(eventStartDelete());
    };

  return (
    <button
        className='btn btn-danger fab-danger'
        onClick={handleDelete}    
    >
        <i className='fas fa-trash'></i>
        <span>Delete Event</span>
    </button>
  );
};
