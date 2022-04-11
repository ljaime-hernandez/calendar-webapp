import React, { useState } from 'react'
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useForm } from '../../hooks/useForm';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  const now = moment().minutes(0).seconds(0).add(1,'hours');
  const end = moment().minutes(0).seconds(0).add(2,'hours');

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());
    const [values, handleInputChange] = useForm({
        title: 'Event',
        notes: '',
        start: now.toDate(),
        end: end.toDate()
    })

    const {notes, title} = values;

    const closeModal = () => {
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        handleInputChange(e);
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        handleInputChange(e);
    }

  return (
    <Modal
        isOpen={true}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className='modal'
        overlayClassName='modal-fondo'
      >
          <h1> New Event </h1>
            <hr />
            <form className="container">

                <div className="form-group">
                    <label>Initial Date and Time</label>
                    <DateTimePicker 
                        onChange={handleStartDateChange} 
                        value={dateStart} 
                        name="start"
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Final Date and Time</label>
                    <DateTimePicker 
                        onChange={handleEndDateChange} 
                        value={dateEnd} 
                        minDate={dateStart}
                        name="end"
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title and Notes</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>

            </form>
      </Modal>
  )
}
