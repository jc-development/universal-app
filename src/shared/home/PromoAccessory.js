import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimelineMax from 'gsap/TimelineMax';
import { Power3 } from 'gsap/src/uncompressed/easing/EasePack';

import EliteAccessories from './assets/images/accessories.jpg';
import { EliteLogoWhite } from './assets/images/EliteLogoWhite';
import './assets/css/promo-accessory.css';

export default class PromoAccessory extends Component {

  constructor() {
    super();

    this.imageTimeline = new TimelineMax({ paused: true });
    this.buttonTimeline = new TimelineMax({ paused: true });

    this.image = null, this.button = null;
    this.handleMouseOverImage = this.handleMouseOverImage.bind(this);
    this.handleMouseOutImage = this.handleMouseOutImage.bind(this);
    this.handleMouseOverButton = this.handleMouseOverButton.bind(this);
    this.handleMouseOutButton = this.handleMouseOutButton.bind(this);
  }

  componentDidMount() {

    this.imageTimeline
      .fromTo(this.image, 1, { filter: 'brightness(0.75)', scale: 1.0 }, { filter: 'brightness(0.5)', scale: 1.25, ease: Power3.easeInOut })

    this.buttonTimeline
      .to(this.button, 0.5, { backgroundColor: '#FFFFFF', color: '#000000', ease: Power3.easeIn });
  }

  handleMouseOverImage() {
    this.imageTimeline.play();
  }

  handleMouseOutImage() {
    this.imageTimeline.reverse();
  }

  handleMouseOverButton() {
    this.buttonTimeline.play();
  }

  handleMouseOutButton() {
    this.buttonTimeline.reverse();
  }

  componentWillUnmount() {
    this.imageTimeline = null;
    this.buttonTimeline = null;

    this.image = null;
    this.button = null;
  }

  render() {
    return (
      <article className="promo-accessory" onMouseOver={this.handleMouseOverImage} onMouseOut={this.handleMouseOutImage}>
        <div>
          <header>
            <EliteLogoWhite />
            <h6>Elite Bow Accessories</h6>
          </header>
          <ul>
            <li>7 1/4" & 11" Stabilizers</li>
            <li>1 Piece Quivers</li>
            <li>QAD Rests</li>
          </ul>
          <p><span>AND much more!</span></p>
          <Link to="/store/accessories"><button ref={ el => this.button = el} onMouseOver={this.handleMouseOverButton} onMouseLeave={this.handleMouseOutButton}>SHOP Now</button></Link>
        </div>
        <div>
          <img ref={el => this.image = el} src={EliteAccessories} title="Accessorize your Elite bow with Official Elite Accessories" />
        </div>
      </article>
    );
  }
}
