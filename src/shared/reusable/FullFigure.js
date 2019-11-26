import React from 'react';

export const FullFigure = (props) => {
  const getFigcaption = () => {
    if (props.figCaption) {
      return <figcaption>{props.figCaption}</figcaption>;
    } else {
      return null;
    }
  }

  return (
    <figure>
      <img src={props.imgSrc} />
      { getFigcaption() }
    </figure>
  );
}
