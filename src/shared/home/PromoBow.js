import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBowFamily as fetchBowFamilyAction } from '../bows/bow-model/assets/utilities/bow-family/bow-family-actions';
import TimelineMax from 'gsap/TimelineMax';
import { Power3 } from 'gsap/src/uncompressed/easing/EasePack';
import { Ritual35Logo } from './assets/images/Ritual35Logo';
import { Ritual35BowShadow } from './assets/images/Ritual35BowShadow';
import { Ritual35BowShadowMobile } from './assets/images/Ritual35BowShadowMobile';
import MonthlyPayment from '../klarna/MonthlyPayment';
import './assets/css/promo-bow.css';

class PromoBow extends Component {

  constructor() {
    super();

    this.button = null;
    this.timeline = new TimelineMax({ paused: true });
    this.handleResize = this.handleResize.bind(this);
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);

    this.state = {
      bowImage: null
    }
  }

  handleResize() {
    if (window.innerWidth > 900) {
      this.setState({ bowImage: <Ritual35BowShadow /> });
    } else {
      this.setState({ bowImage: <Ritual35BowShadowMobile /> });
    }
  }

  handleOnMouseOver() {
    this.timeline.play();
  }

  handleOnMouseOut() {
    this.timeline.reverse();
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.timeline
      .to(this.button, 0.5, { backgroundColor: '#645b52', ease: Power3.easeIn });
  }

  componentWillMount() {
    this.props.fetchBowFamily('ritual');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.button = null;
    this.timeline = null;
  }

  render() {
    return (
      <article className="promo-bow">
        {this.state.bowImage !== null ? this.state.bowImage : null}
        <div className="left-side">
          <header>
            <h6>Introducing the <span>2019</span></h6>
            <Ritual35Logo />
          </header>
          <div>
            <Link to={{ pathname: "/elite-bows/ritual/buy", state: { bowIndex: 2 } }}><button onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} ref={ el => this.button = el }>Start Building</button></Link>
            <Link to="/elite-bows/ritual/overview">Learn More</Link>
          </div>
          <MonthlyPayment
          id={"ritual-35-promo"}
          amount={`${1099}00`}
          />
        </div>
      </article>
    );

  }
}

const mapStateToProps = ({ bowFamily }) => ({ bowFamily });
export default connect(mapStateToProps, { fetchBowFamily: fetchBowFamilyAction})(PromoBow);
