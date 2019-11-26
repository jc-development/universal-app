import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TweenMax from 'gsap/TweenMax';

import VideoPlayer from './../../videojs-player/VideoPlayer';

export default class HomeVideoPlaylist extends Component {

  constructor(props) {
    super(props);

    this.clickSpan;
  }

  componentDidMount() {
    TweenMax.to(this.clickSpan, 4.25, {autoAlpha: 0.25, repeat: 500, yoyo: true})
  }

  render () {
    const videoJsOptions = {
      id: "homeHeroVid",
      muted: true,
      autoplay: true,
      playsinline: true,
      loop: true,
      controls: false,
      aspectRatio: "16:9",
      preload: "auto",
      poster: "https://s3.amazonaws.com/elite-website/v2/videos/home-vid-poster.jpg",
      sources: [{
        src: "https://s3.amazonaws.com/elite-website/v2/videos/elite-factory.mp4",
        type: 'video/mp4'
      }],
      // onPlay: this.onVideoPlay,
      // onPause: this.onVideoPause
    }

    const heroVideo = ( props ) => (
      <div className="home-hero-video">
        <div className="home-hero-video-text">
          <header>
            <p>- HUNTING - FIELD - 3D - INDOOR -</p>
            <h1>Click <span ref={(clickSpan) => { this.clickSpan = clickSpan }}> to Start Building<br /> Your Elite Bow</span></h1>
          </header>
        </div>
        <VideoPlayer { ...videoJsOptions } />
      </div>
    );
  return heroVideo()
  }
}
