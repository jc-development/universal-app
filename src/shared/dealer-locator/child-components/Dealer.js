import React from 'react';

export const Dealer = (props) => {

  return (
    <li onClick={() => props.handleDealerClick(props)} className="dealer-item">
      <p className="dealer-name">{props.dealerName}</p>
      <p className="dealer-address">{props.dealerAddress}<br></br>{props.dealerCity}, {props.dealerState} {props.dealerPostal}</p>
      <p className="dealer-phone">{props.dealerPhone}</p>
      <p>{props.dealerDistance + " Miles"}</p>
      <input name="dealerEmail" type="hidden" value={props.dealerEmail} />
      {props.dealerKure === "1" || props.dealerRezult === "1" ?
        <div className="bow-icons-wrapper">
          {props.dealerKure === "1" ? <img src="https://s3.amazonaws.com/elite-website/images/elite-kure-pin-legend.png"  alt="Elite Archery Dealer Locator Pin for KURE Bow"/> : null}
          {props.dealerRezult === "1" ? <img src="https://s3.amazonaws.com/elite-website/images/elite-rezult-pin-legend.png"  alt="Elite Archery Dealer Locator Pin for REZULT Bow"/> : null}
        </div>
      : null}
  </li>
  )
}
