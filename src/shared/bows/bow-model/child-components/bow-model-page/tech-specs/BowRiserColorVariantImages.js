import React from 'react';
import './../assets/css/bow-riser-color-variant-images.css';
import { Link } from 'react-router-dom';

export const BowRiserColorVariantImages = (props) => {
  const getDDs = (finishes) => {
    return finishes.map( colorGroup => {
      return (
        <dd>
          <Link to={{ pathname: `/elite-bows/${props.familyName.toLowerCase()}/buy`, state: { bowIndex: props.bowIndex } }}>
            {colorGroup.image !== null ? <img src={colorGroup.image} alt={colorGroup.color.patternName} /> : null}{colorGroup.color.patternName}
          </Link>
        </dd>
      );
    })
  };

  const displayImages = (images) => {
    return images.brands.map( colorTypeGroup => {
      return (
        <dl>
          <dt>{colorTypeGroup.name}</dt>
          { getDDs(colorTypeGroup.finishes) }
        </dl>
      );
    })
  };

  const createImages = () => {
    return props.images.map( imageGroup => {
      return displayImages(imageGroup);
    });
  }

  return (
    <section id="bow-riser-color-variant-images">
      <header>
        <h3>Finish</h3>
      </header>
      { createImages() }
    </section>
  );

};
