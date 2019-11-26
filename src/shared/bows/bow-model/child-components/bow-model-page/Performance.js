import React, { Component } from 'react';
import SeriesSlider from './SeriesSlider';
import CapabilityHighlights from './CapabilityHighlights';

import './assets/css/performance.css';

export default class Performance extends Component {

  constructor() {
    super();

    this.fpsInterval = null;
    this.drawWeightInterval = null;
    this.drawLengthInterval = null;
    this.massWeightInterval = null;
    this.fpsSpan = null;

    this.state = {
      fps: 0,
      drawWeight: 0,
      drawLength: 0,
      massWeight: 0
    };
  }


  componentDidMount() {
    this.fpsInterval = setInterval( () => this.setState({ fps: this.state.fps + 1 }), 10 );
    this.drawWeightInterval = setInterval( () => this.setState({ drawWeight: this.state.drawWeight + 1 }), 75 );
    this.drawLengthInterval = setInterval( () => this.setState({ drawLength: this.state.drawLength + 0.5}), 75 );
    this.massWeightInterval = setInterval( () => this.setState({ massWeight: this.state.massWeight + 0.1 }), 100 );
  }

  componentDidUpdate(prevState) {

    if ( (prevState.fps !== this.state.fps) && (this.state.fps === this.props.performance.fps) ) {
      clearInterval(this.fpsInterval);
    }

    if ( (prevState.drawWeight !== this.state.drawWeight) && ( this.state.drawWeight === this.props.performance.drawWeight) ) {
      clearInterval(this.drawWeightInterval);
    }

    if ( (prevState.drawLength !== this.state.drawLength) && ( this.state.drawLength === this.props.performance.drawLength ) ) {
      clearInterval(this.drawLengthInterval);
    }

    if ( (prevState.massWeight !== this.state.massWeight) && (this.state.massWeight.toFixed(1) === this.props.performance.massWeight.toFixed(1)) ) {
      clearInterval(this.massWeightInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.fpsInterval);
    clearInterval(this.drawWeightInterval);
    clearInterval(this.drawLengthInterval);
    clearInterval(this.massWeightInterval);

    this.fpsInterval = null;
    this.drawWeightInterval = null;
    this.drawLengthInterval = null;
    this.massWeightInterval = null;
    this.fpsSpan = null;
  }

  render () {
    return (
      <section id="bow-performance" ref={this.props.performanceRef}>
        <article>
          <header>
            <h2>Performance</h2>
            <h3>{ this.props.performance.header }</h3>
          </header>
          <p>{ this.props.performance.p }</p>

          <ul className="specs">
            <li>
              Up to <span ref={el => this.fpsSpan = el}>{this.state.fps}</span> FPS
            </li>
            <li>
              Starting at <span>{this.state.drawWeight}</span> LBS Draw Weight
            </li>
            <li>
              Starting at <span>{this.state.drawLength.toFixed(1)}</span>inch Draw Length
            </li>
            <li>
               Only <span>{this.state.massWeight.toFixed(1)}</span> LBS Mass Weight
            </li>
          </ul>

          <SeriesSlider seriesSlider={this.props.seriesSlider} />

          {/* <CapabilityHighlights useTypes={this.props.useTypes} /> */}

        </article>
      </section>
    );
  }
}
