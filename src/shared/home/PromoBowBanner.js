import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimelineMax from 'gsap/TimelineMax';
import { Power3 } from 'gsap/src/uncompressed/easing/EasePack';

import './assets/css/promo-bow-banner.css';

export default class PromoBowBanner extends Component {

  constructor() {
    super();

    this.imageTimeline = new TimelineMax({ paused: true });

    this.image = null, this.button = null;
    this.handleMouseOverImage = this.handleMouseOverImage.bind(this);
    this.handleMouseOutImage = this.handleMouseOutImage.bind(this);
  }

  componentDidMount() {
    this.imageTimeline
      .fromTo(this.image, 1, { filter: 'brightness(1)', scale: 1.0 }, { filter: 'brightness(0.75)', scale: 1.2, ease: Power3.easeInOut })
  }

  handleMouseOverImage() {
    this.imageTimeline.play();
  }

  handleMouseOutImage() {
    this.imageTimeline.reverse();
  }

  componentWillUnmount() {
    this.imageTimeline = null;
    this.image = null;
  }

  render() {

    const linkStyle = {
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
    }

    return (
      <Link to={this.props.linkTo} style={linkStyle} onMouseOver={this.handleMouseOverImage} onMouseOut={this.handleMouseOutImage}>
        <img className="promo-bow-banner" ref={el => this.image = el} src={this.props.src} alt={this.props.alt} />
      </Link>
    );
  }
}
