import React, { Component } from 'react';

import TimelineMax from 'gsap/TimelineMax';
import EasePack from 'gsap/src/uncompressed/easing/EasePack';
import './assets/css/animated-fullscreen-movie.css';

export default class AnimatedFullScreenMovie extends Component {

  constructor(props) {
    super(props);

    this.animationTimeline = null;
    this.videoContainer = null;
    this.video = null;
    this.h2 = null;

    this.playVideo = this.playVideo.bind(this);
    this.handleVideoEnd = this.handleVideoEnd.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.animationTimeline = new TimelineMax({paused: true, onComplete: this.playVideo, onReverseComplete: this.props.closeVideo});

    this.animationTimeline
      .fromTo(this.videoContainer, 0.6, {height: 0, width: 0, top: '50%', left: '50%', autoAlpha: 0.5}, {height: '100vh', width: '100vw', top: 0, left: 0, autoAlpha: 1, ease: EasePack.Power2.easeOut})
      .fromTo(this.h2, 0.5, {display: 'none', autoAlpha: 0}, {display: 'block', autoAlpha: 1})
      .call(this.playVideo);

    this.animationTimeline.play();

    this.video.addEventListener('ended', this.handleVideoEnd);

  }

  playVideo() {
    this.video.play();
  }

  handleVideoEnd() {
    this.video.pause();
    this.animationTimeline.reverse();
  }

  handleClose(event) {
    event.preventDefault();
    this.handleVideoEnd();
  }

  componentWillUnmount() {
    this.video.removeEventListener('ended', this.handleVideoEnd);
    this.animationTimeline = null;
    this.videoContainer = null;
    this.video = null;
    this.h2 = null;
  }

  render() {
    return (
      <div id="animated-fullscreen-video-wrapper" ref={videoContainer => this.videoContainer = videoContainer}>
        <a href="#" onClick={this.handleClose} ref={h2 => this.h2 = h2}>X</a>
        <video src={this.props.videoSrc}  controls ref={video => this.video = video} />
      </div>
    );
  }

}
