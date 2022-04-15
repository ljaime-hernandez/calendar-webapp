import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';

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
  const firstEnd = moment().minutes(0).seconds(0).add(2,'hours');

  const initialState = {
      title: '',
      notes: '',
      start: now.toDate(),
      end: firstEnd.toDate()
  }

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const {modalOpen} = useSelector( state => state.ui );
    const {activeEvent} = useSelector( state => state.calendar );
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(firstEnd.toDate());
    const [titleValid, setTitleValid] = useState(true)
    const [values, setValues] = useState({
        title: 'Event',
        notes: '',
        start: now.toDate(),
        end: firstEnd.toDate()
    })

    const {notes, title, start, end} = values;

    useEffect(() => {
        if(activeEvent) {
            setValues(activeEvent)
        }
    }, [activeEvent, setValues])
    

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'Second date should be greater than first date', 'error');
        }
        if (title.trim().length < 2){
            return setTitleValid(false);
        }

        dispatch(eventAddNew({
            ...values,
            id: new Date().getTime(),
            user: {
                _id: '1234',
                name: 'Miguel'
              }
        }))
        setTitleValid(true);
        closeModal(); 
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        setValues(initialState);
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setValues({
            ...values,
            start: e
        });
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setValues({
            ...values,
            end: e
        });
    }

  return (
    <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className='modal'
        overlayClassName='modal-fondo'
      >
          <h1> New Event </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

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
                        className={`form-control ${!titleValid && 'is-invalid'}`}
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
