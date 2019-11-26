import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimelineMax from 'gsap/TimelineMax';
import { Power3 } from 'gsap/src/uncompressed/easing/EasePack';

import patchHatBgSrc from './assets/images/patch-hat-bg.jpg';
import patchWhiteIconsSrc from './assets/images/patch-hat-patch-white-icons.png';
import eliteNextLevelBluePatch from './assets/images/patch-elite-echelon-next-level-blue-sm.png';
import eliteNextLevelGreenPatch from './assets/images/patch-elite-echelon-next-level-green-sm.png';
import eliteHonorRitDeerOrangePatch from './assets/images/patch-elite-honor-the-ritual-deer-orange-sm.png';
import eliteHonorRitShieldOrangePatch from './assets/images/patch-elite-honor-the-ritual-shield-orange-sm.png';
import eliteRitualGreenPatch from './assets/images/patch-elite-ritual-green-sm.png';

import './assets/css/hat-builder.css';

export default class HatBuilder extends Component {

  constructor(props) {
    super(props);

    this.cycleThruPatchesOverHat = this.cycleThruPatchesOverHat.bind(this);
    this.setUpBuilderUI = this.setUpBuilderUI.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.intervalId;
    this.currentIndex = 0;
    this.patchesOverHatArray = [eliteNextLevelBluePatch, eliteNextLevelGreenPatch, eliteHonorRitDeerOrangePatch, eliteHonorRitShieldOrangePatch, eliteRitualGreenPatch];
    this.link = null;
    this.instIcons = null;

    this.timeline = new TimelineMax({ paused: true });

    this.state = {
      currentPatch: this.patchesOverHatArray[this.currentIndex],
      component: null,
      windowSize: null
    };
  }

  handleViewPatchClick(patchName) {
    switch (patchName) {
      case "nextLevelBluePatch":
        this.setState({
          currentPatch: this.patchesOverHatArray[0]
        });
        break;

      case "nextLevelGreenPatch":
        this.setState({
          currentPatch: this.patchesOverHatArray[1]
        });
        break;

      case "honorTheRitualDeerOrangePatch":
        this.setState({
          currentPatch: this.patchesOverHatArray[2]
        });
        break;

      case "honorTheRitualShieldOrangePatch":
        this.setState({
          currentPatch: this.patchesOverHatArray[3]
        });
        break;

      case "ritualGreenPatch":
        this.setState({
          currentPatch: this.patchesOverHatArray[4]
        });
        break;

      default:
        break;
    }
  }

  handleMouseOver() { this.timeline.play() }
  handleMouseOut() { this.timeline.reverse() }


  componentDidMount() {
    this.intervalId = setInterval(this.cycleThruPatchesOverHat, 1500);
    this.timeline.to(this.link, 1, { color: '#337ab7'} );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.currentIndex = 0;
    this.patchesOverHatArray = null;
    this.link = null;
    this.instIcons = null;
  }

  cycleThruPatchesOverHat() {
    if (this.currentIndex < this.patchesOverHatArray.length - 1) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }

    this.setState({
      currentPatch: this.patchesOverHatArray[this.currentIndex]
    });
  }

  setUpBuilderUI() {
    clearInterval(this.intervalId);
  }


  render() {

    const testComponent = () => {
      if (typeof this.state.component !== undefined && this.state.component !== null) {
        const Component = this.state.component.default;
        return <Component handleViewPatchClick={this.handleViewPatchClick} />
      } else {
        return null;
      }
    }

    return (
      <section id="hat-builder">
      <Link to="/store/apparel/hats/mesh-back-elite-patch-hat">
        <header>
          <h2 ref={ el => this.link = el} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>Click to Buy YOUR ELITE PATCHES &amp; HAT</h2>
        </header>
        <img ref={instIcons => this.instIcons = instIcons} src={patchWhiteIconsSrc} alt="Design your own Elite Patch Hat" id="step-icons" />
        {/* this src will be the changer */}
        <img src={this.state.currentPatch} id="current-patch-img" />
        { testComponent() }
        <img src={patchHatBgSrc} alt="Design your own Elite Patch Hat" id="patch-hat-bg" />
        </Link>
      </section>
    );
  }
}
