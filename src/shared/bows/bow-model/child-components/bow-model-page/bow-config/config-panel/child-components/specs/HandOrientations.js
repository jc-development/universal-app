import React, { Component } from 'react';

export default class HandOrientations extends Component {
  constructor() {
    super();
    this.setOrientation = this.setOrientation.bind(this);
  }

  setOrientation(orientation) {
    this.setState({ orientation });
    this.props.setHandOrientation(orientation);
  }

  render() {
    // console.log('this.props: ', this.props)
    return (
      <div className="spec-wrapper">
        <h6>Hand Orientation</h6>
        <label htmlFor="handOrientationRight" className={this.props.currentHand === "right" ? "active" : null}>
          <input checked={this.props.currentHand === "right" ? true : false} onChange={() => this.setOrientation("right")} type="radio" id="handOrientationRight" name="handOrientationRight" value="right"/>
          RIGHT
        </label>
        {this.props.currentBowModel !== "valor" ?
          <label htmlFor="handOrientationLeft" className={this.props.currentHand === "left" ? "active" : null}>
            <input checked={this.props.currentHand === "left" ? true : false} onChange={() => this.setOrientation("left")} type="radio" id="handOrientationLeft" name="handOrientationLeft" value="left"/>
            LEFT
          </label>
          : null}
      </div>
    );
  }
}
