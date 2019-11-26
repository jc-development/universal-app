import React, { Component } from 'react';
import { FullFigure } from './../../../../reusable/FullFigure';

import './assets/css/capability-highlights.css';

export default class CapabilityHighlights extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.setCurrentDataForSlider = this.setCurrentDataForSlider.bind(this);

    this.sliderInterval = null;


    this.state = {
      currentData: this.props.useTypes[0],
      counter: 0
    };
  }

  handleClick(name) {
    const currentData = this.props.useTypes.find( el => el.name === name );
    this.setState({ currentData });
  }

  setCurrentDataForSlider() {
    if (this.state.counter < this.props.useTypes.length - 1) {
      this.setState({
        counter: this.state.counter + 1
      })
    } else {
      this.setState({
        counter: 0
      })
    }
    this.setState({
      currentData: this.props.useTypes[this.state.counter]
    })
  }

  componentDidMount() {
    this.sliderInterval = setInterval( this.setCurrentDataForSlider, 5000 );
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval);
    this.sliderInterval = null;
  }

  render() {

    // console.log('this.props.useTypes: ', this.props.useTypes)

    const checkClassName = (name) => name === this.state.currentData.name ? "active" : null;

    return (
      <section id="capability-highlights">
        <ul>
          <li className={checkClassName("Hunting")} onClick={() => this.handleClick("Hunting")}>Hunting</li>
          <li className={checkClassName("Field")} onClick={() => this.handleClick("Field")}>Field</li>
          <li className={checkClassName("3D")} onClick={() => this.handleClick("3D")}>3D</li>
          <li className={checkClassName("Indoor")} onClick={() => this.handleClick("Indoor")}>Indoor</li>
        </ul>

        <FullFigure
          imgSrc={this.state.currentData.image}
          figCaption={this.state.currentData.caption}
        />

        <p>{this.state.currentData.description}</p>
      </section>
    );
  }
}
