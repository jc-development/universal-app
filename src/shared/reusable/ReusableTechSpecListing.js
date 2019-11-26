import React from 'react';
import './assets/css/reusable-tech-spec-listing.css';

export const ReusableTechSpecListing = (props) => {
  return (
    <article className="reusable-tech-spec-listing">
      <header>
        <h3>{props.h3}</h3>
      </header>
      <p>{props.p}</p>
    </article>
  );
}
