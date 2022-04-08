import React from 'react'
import Modal from 'react-modal';

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

export const CalendarModal = () => {


    const closeModal = () => {
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
                    <input className="form-control" placeholder="Initial Date" />
                </div>

                <div className="form-group">
                    <label>Final Date and Time</label>
                    <input className="form-control" placeholder="Final Date" />
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
