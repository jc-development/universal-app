import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PromoBowBanner from './PromoBowBanner';
import PromoAccessory from './PromoAccessory';
import HatBuilder from '../hat-builder/HatBuilder'
// import DealerLocator from '../dealer-locator/DealerLocator';
import BowsListCompare from '../bows/bows-list-compare/BowsListCompare';

import './assets/css/home-page.css';

export default class HomePage extends Component {

  render () {
    return (
      <section id="home">
        <PromoBowBanner linkTo={"/elite-bows/kure/overview"} src={"https://elite-website.s3.amazonaws.com/images/kure-web-banner.jpg"} alt={'The Elite KURE Bow - The Kure For The Common Bow. Axle To Axle: 31 13/16", Brace Height: 6 9/16", IBO Speed: 335 FPS, Weight: 4.6 lbs., Draw Lengths: 23" - 30", Peak Weights: 40, 50, 60, 65, 70 lbs.'} />
        <PromoBowBanner linkTo={"/elite-bows/rezult/overview"} src={"https://elite-website.s3.amazonaws.com/images/rezult-web-banner.jpg"} alt={'The Elite REZULT Bow - The Rezult Is Accuracy. Axle To Axle: 37 3/4", Brace Height: 7 1/4", IBO Speed: 325 FPS, Weight: 4.7 lbs., Draw Lengths: 24" - 31", Peak Weights: 40, 50, 55, 60, 70 lbs.'} />
        <video className="fullscreen-video" poster="https://elite-website.s3.amazonaws.com/videos/2020-kure-rezult-bow-launch.jpg" src="https://elite-website.s3.amazonaws.com/videos/2020-kure-rezult-bow-launch.mp4" playsinline controls />

        <PromoAccessory />
        {/* <HatBuilder /> */}
        <BowsListCompare />
      </section>
    );
  }
}

/*
<DealerLocator
  match={this.props.match}
  location={this.props.location}
/>
*/
