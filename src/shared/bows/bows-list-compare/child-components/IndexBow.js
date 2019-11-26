import React from 'react';
import { Link } from 'react-router-dom';
import MonthlyPayment from './../../../klarna/MonthlyPayment';


export const IndexBow = (props) => {
  return (
      <Link className="bow-model-link" to={'/elite-bows/' + props.urlModel.replace(/\-.*/g,'') + '/overview'}>
        <img className="bow-image" src={props.bowImage} role="presentation" alt={"Elite Archery - " + props.name} />
        <p className="shop-now">SHOP NOW</p>
        <h5 className="bow-name">{props.name}</h5>
        <div className="klarna-heading-wrapper">
          <MonthlyPayment id={props.urlModel} amount={`${props.msrp}00`} />
          <p>*Based on the retail price of ${props.msrp}.</p>
        </div>
        <p className="bow-axle-axle">Axle to Axle <span>{props.axleToAxle}</span></p>
        <p className="bow-speed-rating">Speed Rating <span>{props.speedRating} FPS</span></p>
        <ul className="bow-use-type-list">
          {typeof props.useTypeIcons !== 'undefined' ?
            props.useTypeIcons.map( (useTypeIcon, i) => {
              return <li key={i}><img className="bow-use-type-icon" src={useTypeIcon.icon} role="presentation" alt={"Elite Archery Bow Use Type Icon"}/></li>;
            }) : null}
        </ul>
    </Link>
  );
}
