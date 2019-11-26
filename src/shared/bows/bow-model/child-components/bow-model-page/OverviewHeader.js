import React, { Component, Fragment } from 'react';
import { FullScreenVideoLoop } from '../../../../reusable/FullScreenVideoLoop';
import PromoBowBanner from '../../../../home/PromoBowBanner';
import { Link } from 'react-router-dom';
import './assets/css/overview-header.css';

import MonthlyPayment from '../../../../klarna/MonthlyPayment';

export default class OverviewHeader extends Component {
  render() {

    // console.log('overviewHeader this.props: ', this.props);

    const highlightNodes = () => {
      return this.props.highlights.map( (highlight, i) => {
        return <li key={i}>{highlight}</li>;
      });
    }

    const klarnaReady = () => {
          return (
            <div className="klarna">
             <MonthlyPayment id="overview-page-top-1" amount={`${this.props.msrp}00`} />
           </div>
          )
    }


    return (
      <Fragment>
        <section id="bow-overview-header" ref={this.props.overviewRef} >
          <header>
            <h1>{ this.props.overview.h1 }</h1>
            {klarnaReady()}
            <h2>{ this.props.overview.h2 }</h2>
            <p>{ this.props.overview.h3 }</p>
          </header>

          <FullScreenVideoLoop
            src={this.props.headerVideo}
            autoPlay={false}
            controls={true}
            playsInline={true}
            posterSrc={this.props.headerVideoPoster}
            muted={false}
          />

          <ul>{ this.props.highlights ? highlightNodes() : null }</ul>

        </section>
      </Fragment>
    );
  }
};
