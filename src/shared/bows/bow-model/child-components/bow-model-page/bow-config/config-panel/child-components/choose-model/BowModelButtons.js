import React, { Component } from 'react';
import './assets/css/bow-model-buttons.css';

export default class BowModelButtons extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    this.props.updateBow(name);
  }

  render() {

    // console.log('bowmodelbuttons this.props: ', this.props);

    const isActive = (bowName) => {
      if (bowName === this.props.currentBow.name) {
        return 'active';
      } else {
        null;
      }
    };

    const displayModels = () => {
      return this.props.compareBowModels.map( (bow, i) => {
        return (
          <li key={i}>
            <img
              onClick={() => this.handleClick(this.props.bowNames[i])}
              src={bow.bowImage}
              className={isActive( this.props.bowNames[i] )}
              alt={`Elite Archery ${this.props.bowNames[i]} Bow`}
            />
          </li>
        );
      });
    };

    const handleTitleClass = () => {
      if (this.props.firstSection.position === "fixed") {
        return "section-title-fixed"
      } else if (this.props.firstSection.position === "absolute") {
        return "section-title-absolute"
      } else {
        return null
      }
    }

    const handleTitleStyle = () => {
      if (this.props.firstSection.position === "fixed") {
        return this.props.firstSection.sectionTitleTop
      } else {
        return null
      }
    }

    return (
      <div className="bow-model-buttons" style={this.props.firstSection.position !== null ? this.props.firstSection.sectionPadding : null}>
        <h5 className={handleTitleClass()} style={handleTitleStyle()}>Select Bow Model</h5>
        <ul className="bow-series-buttons" ref={this.props.refChildComponentOptions}>
          {this.props.bowNames ? displayModels() : null }
        </ul>
        <p>SELECTED BOW: <span>{this.props.currentBow.name.toUpperCase()}</span></p>
      </div>
    );
  }
}
