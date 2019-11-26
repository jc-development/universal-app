import React, { Component, Fragment } from 'react';
import rezultLogo from './../assets/images/rezult-logo.png';
import kureLogo from './../assets/images/kure-logo.png';
import mobileRezultImageSrc from './../assets/images/rezult-main-bow.png';
import mobileKureImageSrc from './../assets/images/kure-main-bow.png';

export default class Intro extends Component {

  constructor(props) {
    super(props);

    this.intro;

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if (this.props.checkPosition) this.props.checkPosition(this.intro.getBoundingClientRect().bottom);
    this.intro.style.opacity = (this.intro.getBoundingClientRect().bottom > 0) ? (this.intro.getBoundingClientRect().bottom / window.innerHeight) : 0;
  }

  componentDidMount() {
    if (!this.props.isMobile) {
      window.addEventListener('scroll', this.handleScroll);
      if (this.props.checkPosition) this.props.checkPosition(this.intro.getBoundingClientRect().bottom);
    }
  }

  componentWillUnmount() {
    if (!this.props.isMobile) window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { isMobile, bowName } = this.props;

    const isRezultBow = () => bowName === "ReZult" ? true : false;

    const setImg = () => isRezultBow() ? <img src={rezultLogo} alt="The REZULT Target Bow from Elite Archery" /> : <img src={kureLogo} alt="The KURE Hunting Bow from Elite Archery" />

    const setHeader = () => isRezultBow() ? <h4>THE REZULT Target Bow <span>from Elite Archery</span></h4> : <h4>THE KURE Hunting Bow <span>from Elite Archery</span></h4>

    const setDescription = () => isRezultBow() ? (<Fragment><p>The challenge in most modern compound bows is easily unlocking the maximum potential tune. Tuning many bows on the market today can be an in-depth, complicated, time consuming, and frustrating process. Simply put, the technology hasn't existed to allow the perfect feel and tune from a bow.</p>
    <p>Until now.</p></Fragment>) : (<Fragment><p>No matter what arrows you use. What rest you install. What your grip looks like. Which broadheads you use. The Kure adapts to you.</p>
    <p>Never before seen technology from the minds of some of the world's most recognizable archers eliminates the frustrations of tuning a bow.</p></Fragment>);

    const setMainImgSrc = () => isRezultBow() ? <img src={mobileRezultImageSrc} /> : <img src={mobileKureImageSrc} />

    return (
      <section ref={ (ref) => this.intro = ref } id="design-intro">
        <article>
          <header>
            { setImg() }
            { setHeader() }
          </header>
          { setDescription() }
          { isMobile ? setMainImgSrc() : null }
        </article>
      </section>
    );
  }
}
