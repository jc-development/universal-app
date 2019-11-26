import React, { Component } from 'react';
import Video from './assets/shared/Video';
import { checkPosition } from './assets/utils/utils';

export default class Limbs extends Component {
  constructor() {
    super();

    this.limbWidth;
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      limbWidthInView: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({ limbWidthInView: checkPosition(this.limbWidth) });
  }

  render() {
    const { limbWidthInView } = this.state;
    const { isMobile, bowName } = this.props;

    const setBowName = () => bowName === "ReZult" ? "rezult" : "kure";

    return (
      <section ref={this.props.limbsRef}>
      <article className="content">
        <header>
          <h2>Upgraded Limbs</h2>
        </header>
        <p>Elite's bullet-proof limbs have long been a hallmark of the quality and shootability found in Elite bows. Now working with the StabiLock Limb Pockets and Asym Tri-Track Cams, the wider limb stance delivers unparalleled stability. The stability in this platform delivers a bow that aims, holds, and is a true pleasure to shoot.</p>
        <p>VibeX Blocks - designed specifically to rotate and fit Elite’s 3/4” or 1” limb gap.  The VibeX Blocks reduces dynamic vibration and gives you a quiet and smooth feeling shot.</p>
      </article>
        <div ref={ el => this.limbWidth = el}>
          { limbWidthInView ? isMobile ? <Video data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/limb-width.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/limb-width-poster.jpg` }} /> : <Video data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/limb-width.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/limb-width-poster.jpg` }} /> : null }
        </div>
      </section>
    );
  }
}
