import React from 'react';

export const Dealer = (props) => {

  return (
    <li className="dealer-item">
      <p className="dealer-name">{props.dealerName}</p>
      <p className="dealer-address">{props.dealerAddress}<br></br>{props.dealerCity}, {props.dealerState} {props.dealerPostal}</p>
      <p className="dealer-phone">{props.dealerPhone}</p>
      <p>{props.dealerDistance + " Miles"}</p>
      <input name="dealerEmail" type="hidden" value={props.dealerEmail} />
      <button className="dealer-button" onClick={() => props.handleDealerClick(props)} >Select Dealer and Checkout</button>
  </li>
  )
}
