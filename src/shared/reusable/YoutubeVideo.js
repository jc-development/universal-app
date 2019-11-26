import React from 'react';

export const YoutubeVideo = ({ youtubeId, youtubeDescription }) => {
  return (
    <div className="youtube-video-wrapper" style={{padding: "2rem 0"}}>
      <div
        className="video"
        style={{
          position: "relative",
          paddingBottom: "56.25%" /* 16:9 */,
          paddingTop: 25,
          height: 0
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          src={`https://www.youtube.com/embed/${youtubeId}`}
          frameBorder="0"
        />
      </div>
      <h6 style={{textAlign: "left", marginBottom: 0}}>Description</h6>
      <p style={{textAlign: "left", marginTop: "0.5rem"}}>{youtubeDescription}</p>
    </div>
    
  );
};
