import React from 'react';
import './../assets/css/bow-riser-size-variant-buttons.css';

export const BowRiserSizeVariantButtons = (props) => {

  const handleClick = (name) => {
    props.switchBow(name);
  }

  const displayButtons = () => {
    return props.bowNames.map( name => {
      return <button className={props.currentBowName === name ? "active" : null} onClick={() => handleClick(name)}>{name}</button>;
    })
  }

  return (
    <div className="bow-model-selection">
      { displayButtons() }
    </div>
  );
}
