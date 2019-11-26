import React, { Component } from 'react';
import Video from './assets/shared/Video';
import { checkPosition } from './assets/utils/utils';
import './assets/css/set.css';

export default class Set extends Component {
  constructor() {
    super();

    this.dualVid, this.firstVid, this.secondVid;
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      dualVidInView: false,
      firstVidInView: false,
      secondVidInView: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.props.isMobile) {
      this.setState({ firstVidInView: checkPosition(this.firstVid) });
      this.setState({ secondVidInView: checkPosition(this.secondVid) });
    } else {
      this.setState({ dualVidInView: checkPosition(this.dualVid) });
    }
  }

  render() {
    const { dualVidInView, firstVidInView, secondVidInView } = this.state;
    const { isMobile, bowName } = this.props;

    const setBowName = () => bowName === "ReZult" ? "rezult" : "kure";


    if (isMobile) {
      return (
        <section ref={this.props.setRef}>
          <article className="content">
            <header>
              <h2>Simplified Exact Tuning</h2>
            </header>
            <div ref={el => this.firstVid = el}>
              { firstVidInView ? <Video data={{ videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/front-angle-top.mp4`, cssClassName: "full-width", posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/front-angle-top-poster.jpg` }} /> : null }
            </div>
            <p>Simplified Exact Tuning (S.E.T) SET Technology is a micro adjustable tuning system exclusive to Elite Archery. SET allows the archer to micro adjust the angle of the limb pocket pivot, providing the easiest, and most effective tuning method on the market without the need of a bow press.</p>
            <p>The effect of adjusting SET Technology is similar to “Yoke Tuning” or “Shimming” but has been engineered to be far more effective and easier.</p>
            <p>SET technology is a very effective tuning method, which does not require a large adjustment to see the results in tuning.</p>
            <div ref={el => this.secondVid = el}>
              { secondVidInView ? <Video data={{ videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/front-angle-bottom.mp4`, cssClassName: "full-width", posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/front-angle-bottom-poster.jpg` }} /> : null }
            </div>
          </article>
        </section>
      );
    } else {
      return (
        <section ref={this.props.setRef}>
          <article className="content">
            <header>
              <h2>Simplified Exact Tuning</h2>
            </header>
            <p>Simplified Exact Tuning (S.E.T) SET Technology is a micro adjustable tuning system exclusive to Elite Archery. SET allows the archer to micro adjust the angle of the limb pocket pivot, providing the easiest, and most effective tuning method on the market without the need of a bow press.</p>
            <p>The effect of adjusting SET Technology is similar to “Yoke Tuning” or “Shimming” but has been engineered to be far more effective and easier.</p>
            <p>SET technology is a very effective tuning method, which does not require a large adjustment to see the results in tuning.</p>
          </article>

          <div ref={el => this.dualVid = el} className="dual-video">
            { dualVidInView ? <Video data={{ videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/front-angle-top.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/front-angle-top-poster.jpg` }} /> : null }
            { dualVidInView ? <Video data={{ videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/front-angle-bottom.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/front-angle-bottom-poster.jpg` }} /> : null }
          </div>
        </section>
      );
    }
  }
}
