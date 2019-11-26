import React, { Component } from 'react';
import { FullFigure } from './../../../../reusable/FullFigure';


export default class SeriesSlider extends Component {

  constructor() {
    super();

    this.state = {
      slideNumber: 0
    };

    this.handleSeriesSlider = this.handleSeriesSlider.bind(this);
  }

  componentDidMount() {
    setTimeout(this.handleSeriesSlider, 3000)
  }

  handleSeriesSlider() {
    let increment

    if (this.state.slideNumber < this.props.seriesSlider.length - 1) {
      increment = this.state.slideNumber + 1
    } else {
      increment = 0
    }

    this.setState({slideNumber: increment}, () => {
      setTimeout(this.handleSeriesSlider, 3000);
    })

  }

  render () {

    // console.log('this.props.seriesSlider: ', this.props.seriesSlider);

    const fullFigureNode = () => {
      // if (this.state.slideNumber) {
        return (
          <FullFigure
            imgSrc={this.props.seriesSlider[this.state.slideNumber].image}
            figCaption={this.props.seriesSlider[this.state.slideNumber].caption}
          />
        );
      // } else {
      //   return null;
      // }
    };

    return fullFigureNode();
  }
}
