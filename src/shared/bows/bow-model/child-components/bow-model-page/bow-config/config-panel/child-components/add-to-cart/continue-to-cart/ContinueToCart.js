import React from 'react';

import './assets/css/continue-to-cart.css';

export const ContinueToCart = (props) => {
  // console.log('yep: ', props.selectedDealer)
  const noMargin = {
    margin: '0'
  }
  return (
    <div className="continue-to-cart">
      <h5>4. Do You Want To Continue With Selected Dealer?</h5>
      <div className="dealer">
        <p className="dealer-name" style={noMargin}>{props.selectedDealer.dealerName}</p>
        <p style={noMargin}>{props.selectedDealer.dealerAddress}<br></br>{props.selectedDealer.dealerCity}, {props.selectedDealer.dealerState} {props.selectedDealer.dealerPostal}</p>
        <p style={noMargin}>{props.selectedDealer.dealerPhone}</p>
      </div>
      <div className="buttons-wrapper">
        <button onClick={props.addBowToCart}>Yes</button>
        <button onClick={props.handleSelectDealerReset}>No</button>
      </div>


    </div>
  )
}
