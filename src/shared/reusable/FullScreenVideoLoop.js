import React from 'react';
import './assets/css/fullscreen-video.css';

export const FullScreenVideoLoop = (props) => {
  return (
    <video
      className={`fullscreen-video ${props.styleClass ? props.styleClass : ''}`}
      loop
      src={props.src}
      onEnded={props.handleEnd}
      autoPlay={props.autoPlay}
      playsInline={props.playsInline}
      controls={props.controls}
      poster={props.posterSrc}
      muted={props.muted}
    />
  );
};
