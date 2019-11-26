import React, { Component } from 'react';
import { FullScreenVideo } from '../../../../reusable/FullScreenVideo';

import TimelineMax from 'gsap/TimelineMax';
import EasePack from 'gsap/src/uncompressed/easing/EasePack';

import './assets/css/dual-video.css';

export default class DualVideo extends Component {

  constructor() {
    super();

    this.firstVideo = null;
    this.secondVideo = null;
    this.timeline = new TimelineMax();
  }

  componentDidMount() {
    this.timeline
      .fromTo(this.firstVideo, 1, {left: '-50%'}, {left: 0, /* onComplete: () => this.firstVideo.play() */})
      .fromTo(this.secondVideo, 1, {left: '50%'}, {left: 0, /* onComplete: () => this.secondVideo.play() */}, '-=1');
  }

  componentWillUnmount() {
    this.firstVideo = null;
    this.secondVideo = null;
    this.timeline = null;
  }

  render() {
    return (
      <section id="dual-video" ref={this.props.dualVideoRef}>
        <FullScreenVideo videoRef={el => this.firstVideo = el} src={"https://s3.amazonaws.com/solid-broadheads/videos/solid-self-filmed-web.mp4"} posterSrc={"https://s3.amazonaws.com/solid-broadheads/videos/solid-broadhead-poster.jpg"} />
        <FullScreenVideo videoRef={el => this.secondVideo = el} src={"https://s3.amazonaws.com/solid-broadheads/videos/solid-self-filmed-web.mp4"} posterSrc={"https://s3.amazonaws.com/solid-broadheads/videos/solid-broadhead-poster.jpg"} />
      </section>
    );
  }
}
