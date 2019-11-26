import React, { Component } from 'react';
import camPlaceHolderSrc from './assets/images/cam.png';

import './assets/css/about-cam.css';

export default class AboutCam extends Component {

  render() {
    return (
      <section id="about-cam" ref={this.props.aboutCamRef}>
        <article>
          <header>
            <h2>CAMS</h2>
            <h3>{this.props.aboutCam.h3}</h3>
          </header>
          <p>{this.props.aboutCam.description}</p>
        </article>
        <video ref={el => this.video = el} src={this.props.aboutCam.video} playsInline autoPlay muted /> {/* add for iOS playsInline="true" autoPlay ="false"  */}
      </section>
    );
  }

}

/*
handleScroll() {
  this.video.playbackRate = 1.0;
  if (this.video.getBoundingClientRect().top <= window.innerHeight / 2 && this.video.currentTime < 3) {
    this.video.currentTime += 0.25;
  } else {
    this.video.currentTime -= 0.25;
  }
}

this.handleScroll = this.handleScroll.bind(this);

// window.addEventListener('scroll', this.handleScroll, false);

componentWillUnmount() {
  // window.removeEventListener('scroll', this.handleScroll, false);
}

*/
