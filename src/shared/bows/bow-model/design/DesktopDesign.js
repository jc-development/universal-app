import React, { Component } from 'react';
import Intro from './children/Intro';
import Cams from './children/Cams';
import Set from './children/Set';
import Limbs from './children/Limbs';
import StabilockPockets from './children/StabilockPockets';
import RezultContent from './children/RezultContent';
import KureContent from './children/KureContent';

import './assets/css/design.css';

export default class DesktopDesign extends Component {

  constructor() {
    super();

    this.designContentWrapper, this.setRef, this.designMoreContent;
    this.requestId, this.container, this.video, this.setHeight, this.scrollPlay;
    this.playbackConst = 1200; // lower is faster playback

    this.handleScroll = this.handleScroll.bind(this);
    this.getPosition = this.getPosition.bind(this);

    this.camsRef, this.setRef, this.limbRef, this.stabilockPocketRef;

    this.state = {
      introBottomPosition: 1
    };

  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.video.onLoadedMetadata = () => {
      this.designContentWrapper.style.height = Math.floor(this.video.duration) * this.playbackConst + "px";
    }

  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.scrollPlay);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {

    if ( this.designContentWrapper.getBoundingClientRect().bottom <= 0 ) {
      this.designContentWrapper.style.overflow = "hidden";
      this.video.style.position = "absolute";
    } else {
      this.designContentWrapper.style.overflow = "inherit";
      this.video.style.position = "fixed";
    }


    if ( this.designContentWrapper.getBoundingClientRect().bottom <= this.video.getBoundingClientRect().bottom ) {
      // console.log('hit bottom change the other elements style attrs');
      this.designMoreContent.style.zIndex = 1;
    } else {
      this.designMoreContent.style.zIndex = 0;
    }

    let frameNumber = 0; // start at frame 0

    // listen for condition of the #rezult-intro bottom at <= 0 to commence updating the video's current time

    this.scrollPlay = () => {
      if (this.video !== null && this.state.introBottomPosition <= 0) {
        frameNumber = (window.pageYOffset - window.innerHeight) / this.playbackConst;
      } else {
        frameNumber = 0;
      }
      this.video.currentTime = frameNumber;
    };

    window.requestAnimationFrame(this.scrollPlay);

  }


  getPosition(bottomPos) {
    this.setState( {introBottomPosition: bottomPos} );
  }

  render() {

    const { bowName } = this.props;

    const isRezultBow = () => bowName === "ReZult" ? true : false;

    const setPosterSrc = () => isRezultBow() ? "http://elite-website.s3.amazonaws.com/2020/rezult/videos/top-bottom-spin3-poster.jpg" : "http://elite-website.s3.amazonaws.com/2020/kure/videos/top-bottom-poster.jpg";

    const checkVidSrc = () => {
      if ( isRezultBow() ) {
        return <source type="video/mp4" src="https://elite-website.s3.amazonaws.com/2020/rezult/videos/top-bottom-spin3.mp4" />;
      } else {
        return <source type="video/mp4" src="https://elite-website.s3.amazonaws.com/2020/kure/videos/top-bottom.mp4" />;
      }
    };

    const setBowName = () => isRezultBow() ? "rezult" : "kure";
    const setContent = () => isRezultBow() ? <RezultContent /> : <KureContent />;

    return (
      <div id="design-main-wrapper">

        <Intro checkPosition={this.getPosition} isMobile={false} bowName={this.props.bowName} />

        <section ref={ el => this.designContentWrapper = el} id={ `${ setBowName() }-content-wrapper` }>

          { setContent() }

          <video ref={el => this.video = el} tabIndex="0" autoBuffer preLoad playsInline poster={setPosterSrc()}>
            { checkVidSrc() }
          </video>

        </section>

        <div id={ `${ setBowName() }-more-content-wrapper` } ref={ el => this.designMoreContent = el }>
          <Cams camsRef={ (ref) => this.camsRef = ref } isMobile={false} bowName={this.props.bowName} />
          <Set setRef={ (ref) => this.setRef = ref } isMobile={false} bowName={this.props.bowName}  />
          <Limbs limbsRef={ (ref) => this.limbsRef = ref } isMobile={false} bowName={this.props.bowName}  />
          <StabilockPockets stabilockPocketRef={ (ref) => this.stabilockPocketRef = ref } isMobile={false} bowName={this.props.bowName}  />
        </div>

      </div>
    );
  }
}
