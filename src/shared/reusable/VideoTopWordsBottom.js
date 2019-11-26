import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimelineMax from 'gsap/TimelineMax';
import EasePack from 'gsap/src/uncompressed/easing/EasePack';

import './assets/css/video-top-words-bottom.css';
import ritual30ShieldImgSrc from './assets/images/ritual-30-deer-shield.png';

export default class VideoTopWordsBottom extends Component {

  constructor(props) {
    super(props);

    this.video = null;
    this.ritualShieldImg = null;
    this.h5 = null;
    this.button = null;
    this.timeline = new TimelineMax({ paused: true });
    this.fadeTimeline = new TimelineMax();

    this.handleVideoEnd = this.handleVideoEnd.bind(this);
    this.fadeMessaging = this.fadeMessaging.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      h5: this.props.h5
    };
  }

  componentDidMount() {
    this.timeline
      .fromTo(this.button, 1, {autoAlpha: 1, zIndex: 1}, {autoAlpha: 0, zIndex: 0})
      .fromTo(this.video, 1, {autoAlpha: 0, zIndex: 0}, {autoAlpha: 1, zIndex: 1});

      this.timeline.play();
  }

  componentWillUnmount() {
    this.video = null;
    this.ritualShieldImg = null;
    this.h5 = null;
    this.button = null;
    this.timeline = null;
    this.fadeTimeline = null;
  }

  handleVideoEnd() {
    this.timeline.reverse();
    this.fadeMessaging();
  }

  fadeMessaging() {
    this.fadeTimeline
      .fromTo(this.h5, 0.5, {autoAlpha: 1}, {autoAlpha: 0 })
      .add(() => this.setState({h5: "shoot it to believe it" }))
      .fromTo(this.h5, 1, {autoAlpha: 0}, {autoAlpha: 1});
  }

  handleClick() {
    this.timeline.play();
    this.video.play();
  }

  render() {
    return (
      <article className="video-top-words-bottom">
        <div>
          <video onEnded={this.handleVideoEnd} src={this.props.videoSrc} poster={this.props.posterSrc} autoPlay={this.props.autoPlay} controls ref={el => this.video = el} playsInline="true" muted="true" />
          <button onClick={this.handleClick} ref={el => this.button = el}>play again</button>
        </div>
        <header>
          <h3>{this.props.h3}</h3>
          <h5 ref={el => this.h5 = el}>{this.state.h5}</h5>
          {this.props.videoSrc === "https://s3.amazonaws.com/elite-website/videos/ritual-35-homepage.mp4" ? <Link to="/elite-bows/ritual/overview"><button>{this.props.buttonText}</button></Link> : null}
        </header>
      </article>
    );
  }
}
