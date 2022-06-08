import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    // when the AddNewFab button is clicked, it will change the modalOpen value status from false to true,
    // opening the modal to allow the user to add a new event into our mongo database
    const handleClickNew = () => {
        dispatch(uiOpenModal());
    }
  
    return (
    <button
        className='btn btn-primary fab'
        onClick={handleClickNew}
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
