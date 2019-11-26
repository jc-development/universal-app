import React, { Component } from 'react';

export default class DrawWeights extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(weight) {
    this.setState({ weight });
    this.props.setWeight(weight);
  }

  render() {

    const isChecked = (weight) => {
      if (weight === this.props.currentWeight) {
        return true;
      } else {
        return false;
      }
    };

    const radioButtonNodes = () => {
      return this.props.drawWeights.map((weight, i) => {
        return (
          <label key={i} htmlFor={`drawWeight-${i}`} className={this.props.currentWeight === weight ? "active" : null}>
            <input type="radio" id={`drawWeight-${i}`} name={`drawWeight-${i}`} value={weight} checked={!!isChecked(weight)} onClick={() => this.handleClick(weight)} />
            {weight} lbs.
          </label>
        );
      });
    }

    return (
      <div className="spec-wrapper">
        <h6>Draw Weight</h6>
        { radioButtonNodes() }
      </div>
    );
  }
}
