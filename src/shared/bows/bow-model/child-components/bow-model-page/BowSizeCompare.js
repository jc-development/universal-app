import React, { Component } from 'react';
import TimelineMax from 'gsap/TimelineMax';
import EasePack from 'gsap/src/uncompressed/easing/EasePack';

import './assets/css/bow-size-compare.css';

import { Link } from 'react-router-dom';

export default class BowSizeCompare extends Component {

  constructor() {
    super();

    this.section = null;
    this.h2 = null;
    this.firstImage = null;
    this.secondImage = null;
    this.firstFigCap = null;
    this.secondFigCap = null;
    this.timeline = new TimelineMax();
  }

  componentDidMount() {
    this.timeline
    //   .fromTo(this.section, 1, {autoAlpha: 0}, {autoAlpha: 1})
      .fromTo(this.h2, 0.5, {autoAlpha: 0}, {autoAlpha: 1})
      .fromTo([this.firstImage, this.secondImage], 0.5, {autoAlpha: 0}, {autoAlpha: 1}, '-=0.25')
      .fromTo([this.firstFigCap, this.secondFigCap], 0.5, {autoAlpha: 0}, {autoAlpha: 1}, '-=0.25');
  }

  componentWillUnmount() {
    this.section = null;
    this.h2 = null;
    this.firstImage = null;
    this.secondImage = null;
    this.firstFigCap = null;
    this.secondFigCap = null;
    this.timeline = null;
  }

  render() {
    const bgImage = {
      backgroundImage: `url(${this.props.compareModels.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 0%'
    }

    const renderFigureNodes = () => {
      const getPos = (index) => { index > 0 ? 'second' : 'first' };

      return this.props.compareModels.bows.map( (bow, i) => {
        return (
          <figure>
            <Link to={{ pathname: `/elite-bows/${this.props.familyName.toLowerCase()}/buy`, state: { bowIndex: i } }}>
              <img src={bow.bowImage} ref={`${getPos(i)}Image => this.${getPos(i)}Image = ${getPos(i)}Image`} alt='Elite Archery Bow Model'/>
              <figcaption ref={`${getPos(i)}FigCap => this.${getPos(i)}FigCap = ${getPos(i)}FigCap`}>{bow.axleToAxle} inches axle to axle <span>{bow.massWeight} lbs | {bow.fps} FPS</span></figcaption>
            </Link>
          </figure>
        );
      });
    };

    const articleStyle = {
      display: 'block'
    }

    const headerColumnWidthStyle = {
      gridColumnEnd: 3
    }
    return (
      <section style={this.props.compareModels.backgroundImage !== null ? bgImage : null} id="bow-size-compare" ref={this.props.bowSizeCompareRef}>
        <article style={this.props.compareModels.bows.length === 1 ? articleStyle : null}>
          <header style={this.props.compareModels.bows.length < 3 ? headerColumnWidthStyle : null}><h2 ref={h2 => this.h2 = h2}>{this.props.familyName} Model Comparison</h2></header>
          { renderFigureNodes() }
        </article>
      </section>
    );
  }
};
