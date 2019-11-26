import React, { Component } from 'react';
import Video from './assets/shared/Video';
import { checkPosition } from './assets/utils/utils';

export default class StabilockPockets extends Component {
  constructor() {
    super();
    this.stabilock;
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      stabilockInView: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({ stabilockInView: checkPosition(this.stabilock) });
  }

  render() {
    const { stabilockInView } = this.state;
    const { isMobile, bowName } = this.props;

    const setBowName = () => bowName === "ReZult" ? "rezult" : "kure";

    return (
      <section ref={this.props.stabilockPocketRef}>
        <article ref={el => this.stabilock = el} className="content">
          <header>
            <h2>StabiLock Pockets</h2>
          </header>
          <p>A completely redesigned limb pocket that includes S.E.T. Technology.
          The wide stance of the StabiLock limb pocket is a stable platform that has a pivot point offering an axis of freedom.
          Using this pivot point, the centershot and the cam lean can be quickly and easily altered without a bow press.</p>
        </article>
        { stabilockInView ? isMobile ? <Video data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/stabilock.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/stabilock-poster.jpg` }} /> : <Video data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/stabilock.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/stabilock-poster.jpg` }} /> : null }
      </section>
    );
  }
}
