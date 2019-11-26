import React from 'react';

export const BowLogo = (props) => {
  const imgStyle = {
    // width: 'auto',
    // height: '100%'
  }
  return <img style={imgStyle} src={props.src} />;
}
