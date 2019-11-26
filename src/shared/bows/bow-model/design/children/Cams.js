import React, { Component } from 'react';
import Video from './assets/shared/Video';
import { checkPosition } from './assets/utils/utils';
import './assets/css/cams.css';

export default class Cams extends Component {
  constructor() {
    super();

    this.camTri, this.drawLength, this.letOff, this.limbStop, this.exploded;
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      camTriInView: false,
      drawLengthInView: false,
      letOffInView: false,
      limbStopInView: false,
      explodedInView: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({ camTriInView: checkPosition(this.camTri) });
    this.setState({ drawLengthInView: checkPosition(this.drawLength) });
    this.setState({ letOffInView: checkPosition(this.letOff) });
    this.setState({ limbStopInView: checkPosition(this.limbStop) });
    this.setState({ explodedInView: checkPosition(this.exploded) });
  }

  render() {

    const { camTriInView, drawLengthInView, letOffInView, limbStopInView, explodedInView } = this.state;
    const { isMobile, bowName } = this.props;

    const setBowName = () => bowName === "ReZult" ? "rezult" : "kure";

    return (
      <section id="cams" ref={this.props.camsRef}>
        <div ref={el => this.camTri = el}>
          { camTriInView ? isMobile ? <Video
            data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/cam-tri.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/cam-tri-poster.jpg` }}
          /> : <Video
            data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/cam-tri.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/cam-tri-poster.jpg` }}
          /> : null }
        </div>
        <article className="content">
          <header>
            <h2>Asym Tri-track cams</h2>
          </header>
          <p>New for 2020 on select Elite model bows is the ASYM Tri Track cam System. ASYM is a fully synchronized rotating module cam system with endless adjustments for user preference. The ASYM cam system is a laterally balanced cam, which reduces dynamic lateral nock travel, which results in an accurate, forgiving bow that is easy to tune.</p>
          <p>Elite Archery Engineers have designed the traditional Elite Feel and shootability into the new ASYM Tri Track cam system. The high let off, smooth draw cycle that is synonymous with Elite is still found in the new improved cam system. The new cam system is Asymmetrical top and bottom, these cams are designed specifically to create straight and level vertical nock travel with a fully synchronized system.</p>
        </article>
        <section>
          <div ref={ el => this.drawLength = el}>
            { drawLengthInView ? isMobile ? <Video data={{ videoSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/mobile/draw-length.mp4", posterSrc:"https://elite-website.s3.amazonaws.com/2020/rezult/videos/mobile/draw-length-poster.jpg" }} /> : <Video data={{ videoSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/draw-length.mp4", posterSrc:"https://elite-website.s3.amazonaws.com/2020/rezult/videos/draw-length-poster.jpg" }} /> : null }
            <article>
              <header><h3>Adjust Draw Length</h3></header>
              <p>The ASYM system allows for 7” of draw length adjustment utilizing the Versa Mods without the need of a bow press.</p>
            </article>
          </div>
          <div ref={ el => this.letOff = el}>
            { letOffInView ? isMobile ? <Video data={{ videoSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/mobile/letoff.mp4", posterSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/mobile/letoff-poster.jpg" }} /> : <Video data={{ videoSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/letoff.mp4", posterSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/letoff-poster.jpg" }} /> : null }
            <article>
              <header><h3>Adjust Let Off</h3></header>
              <p>70-90% letoff with use of cable or limb stop. There are 4 positions available that adjust letoff by approximately 5% each time it moves.</p>
            </article>
          </div>
          <div ref={ el => this.limbStop = el}>
            { limbStopInView ? isMobile ? <Video data={{ videoSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/mobile/limbstop.mp4", posterSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/mobile/limbstop-poster.jpg" }} /> : <Video data={{ videoSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/limbstop.mp4", posterSrc: "https://elite-website.s3.amazonaws.com/2020/rezult/videos/limbstop-poster.jpg" }} /> : null }
            <article>
              <header><h3>Adjust Limb Stop</h3></header>
              <p>Adjust to the left or right to for your perfect holding weight.</p>
            </article>
          </div>
        </section>
        <div ref={ el => this.exploded = el}>
          { explodedInView ? isMobile ? <Video data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/exploded.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/mobile/exploded-poster.jpg` }} /> : <Video data={{ cssClassName: "full-width", videoSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/exploded.mp4`, posterSrc: `https://elite-website.s3.amazonaws.com/2020/${setBowName()}/videos/exploded-poster.jpg` }} /> : null }
        </div>
      </section>
    );
  }
}
