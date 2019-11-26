import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';

export const RegistrationModal = (props) => {
  if(props.loader) {
    return(
      <div className="registration-modal">
        <div className="modal-content">
          <FontAwesomeIcon icon={faSpinner} size="6x" pulse />
          <h2>Processing Registration</h2>
          <p>Please wait until process has finished.</p>
        </div>
      </div>
    )
  } else {
    if (props.message.error) {
      const errorList = () => {
        const errorValuesArray = Object.values(props.message.error.list)
        return errorValuesArray.map( error => {
          return <p>{error}</p>
        })
      }
      return (
        <div className="registration-modal">
          <div className="modal-content">
            <h2>Registration Errors</h2>
            {errorList()}
            <p>Please contact customer service if you have any questions at <a href="tel:8775035483">(877) 503-5483</a></p>
            <button className="close-modal-icon" onClick={() => props.close(false)}>X</button>
            <button className="close-modal" onClick={() => props.close(false)}>Close</button>
          </div>
        </div>
      );
    } else {
      return(
        <div className="registration-modal">
          <div className="modal-content">
            <h2>Registration Successful</h2>
            <p>Thank you for completing the warranty registration. A copy of your registration details will be sent to the email address you provided.</p>
            <button className="close-modal-icon" onClick={() => props.close(true)}>X</button>
            <button className="close-modal" onClick={() => props.close(true)}>Close</button>
          </div>
        </div>
      )
    }
  }
}