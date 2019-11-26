import React, { Component } from 'react';
import DrawLengths from './DrawLengths';
import DrawWeights from './DrawWeights';
import HandOrientations from './HandOrientations';

import './../../assets/css/specs.css';

export default class Specs extends Component {


  render() {

    // console.log('this.props SPECS:::: ', this.props)


    const handleTitleClass = () => {
      if (this.props.thirdSection.position === "fixed") {
        return "section-title-fixed"
      } else if (this.props.thirdSection.position === "absolute") {
        return "section-title-absolute"
      } else {
        return null
      }
    }

    const handleTitleStyle = () => {
      if (this.props.thirdSection.position === "fixed") {
        return this.props.thirdSection.sectionTitleTop
      } else {
        return null
      }
    }

    return (
      <div id="bow-specs"  style={this.props.thirdSection.position !== null ? this.props.thirdSection.sectionPadding : null}>
        <h5 className={handleTitleClass()} style={handleTitleStyle()}>Choose Your Specs</h5>
        <div className="spec-layout">
          <DrawLengths drawLengths={this.props.drawLengths} setLength={this.props.setLength} currentLength={this.props.currentLength} currentBowModel={this.props.currentBowModel} />
          <DrawWeights drawWeights={this.props.drawWeights} setWeight={this.props.setWeight} currentWeight={this.props.currentWeight} />
          <HandOrientations setHandOrientation={this.props.setHandOrientation} currentHand={this.props.currentHand} currentBowModel={this.props.currentBowModel} />
        </div>
      </div>
    );
  }
}
