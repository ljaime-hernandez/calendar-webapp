import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../actions/events';

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
  
  // condition made on the Modal elements set just so it does not has conflicts whenever we want to 
  // test this component
  if(process.env.NODE_ENV !== 'test'){
    Modal.setAppElement('#root');
  }

  // declaration of date variables with moment.js which will use the actual date and timeframe with 1 hour of difference
  // so we can create a logical event
  const now = moment().minutes(0).seconds(0).add(1,'hours');
  const firstEnd = moment().minutes(0).seconds(0).add(2,'hours');

  // we use the previously declared variables to initiate the event state along with empty strings
  const initialState = {
      title: '',
      notes: '',
      start: now.toDate(),
      end: firstEnd.toDate()
  }

export const CalendarModal = () => {

    const dispatch = useDispatch();
    // we use the modalOpen retrieved from the store on the uiReducer to allow the modal to be either close or
    // open
    const {modalOpen} = useSelector( state => state.ui );
    // the activeEvent value is retrieved from the store on the calendarReducer as a flag to either create a
    // new event or update an existing event with the help of the useEffect
    const {activeEvent} = useSelector( state => state.calendar );
    // dinamically we use the setState hook so we make sure the dateStart and dateEnd values of the modal form
    // are set to date values
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(firstEnd.toDate());
    // Boolean used to confirm the title in the event created or updated has a greater length than 2 characters
    // if not it will change the input title portion of the form to "is-invalid" so the user corrects it
    const [titleValid, setTitleValid] = useState(true);
    // values on the modal form either retrieving either the data from a previously created event or setting all
    // fields as empty by default if the event is new
    const [values, setValues] = useState(initialState);

    const {notes, title, start, end} = values;

    useEffect(() => {
        // hook evaluating if the event is existing and active or if the event is new, the values on the form
        // will be either one depending on the situation
        if(activeEvent) {
            setValues(activeEvent)
        } else {
            setValues(initialState)
        }

    }, [activeEvent, setValues])
    
    // function use on the useState generic hook for the values on the form to be assigned to the 
    // respective variable
    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        // after the values on both the start and end date are casted as "Date" variables, we then use the
        // moment.js library just so we can create the next condition which will compare the values to our
        // needs, in this case to know if the start value is the same or after the end date value.
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'Second date should be greater than first date', 'error');
        }
        if (title.trim().length < 2){
            return setTitleValid(false);
        }

        // if the event in the modal is an activeEvent, means its already saved in the database, we will
        // then update it with the proper request, if the event was not previously created then we will 
        // do the request to add it to the mongo database
        if(activeEvent) {
            dispatch(eventStartUpdate(values));
        }else{    
            dispatch(eventStartAddNew(values));
        }

        setTitleValid(true);
        closeModal(); 
    }

    const closeModal = () => {
        // value in the modalOpen will change to false, closing the modal
        dispatch(uiCloseModal());
        // if the event was active, the activeEvent value will be set to null
        dispatch(eventClearActive());
        // by default, when the modal is closed, the form values will be set to an initialState,
        // means default dates and empty strings
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
        // prop added for test purposes
        ariaHideApp={ !process.env.NODE_ENV === 'test'}
      >
          {/*title change depends on activeEvent value */}
          <h1> {activeEvent ? 'Edit Event' : 'New Event'} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Initial Date and Time</label>
                    {/*component used to render a proper date and timeframe user interface selection*/}
                    <DateTimePicker 
                        onChange={handleStartDateChange} 
                        value={dateStart} 
                        name="start"
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Final Date and Time</label>
                    {/*component used to render a proper date and timeframe user interface selection*/}
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
                        /*class defined in the form to display wrong data input*/
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Please add a small title for the event</small>
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
                    <small id="emailHelp" className="form-text text-muted">Please add a small description for the event</small>
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
