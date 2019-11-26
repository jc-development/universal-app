import React from 'react';
import eliteLogoSrc from './../../assets/images/elite-logo-white-nav.png';

export const SliderControlPanel = (props) => {
  return (
    <div className="slider-control-panel">
      <img src={eliteLogoSrc} />

      <h4>Product name</h4>
      <p>A summary of this product.</p>

      <nav>
        <ul>
          <li>Shop this specific collection</li>
          <li>Shop this general collection</li>
        </ul>
      </nav>

      {/* Use the css grid */}
      <nav>
        <ul>
          <li> left arrow </li>
          <li>1 of 3</li>
          <li> right arrow </li>
        </ul>
      </nav>

    </div>
  );
}
