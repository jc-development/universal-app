import React, { Component } from 'react';

export default class StepSummary extends Component {

  render() {

    // console.log('STEPSUMMARY this.props: ', this.props);

    const stepNodes = () => {
      let nodesArray = [];
      for (let title in this.props.customerConfiguredBowModel.buildStepSummary) {
        if (this.props.customerConfiguredBowModel.buildStepSummary.hasOwnProperty(title)) {
          nodesArray.push(`${title} : ${this.props.customerConfiguredBowModel.buildStepSummary[title]}`);
        }
      }
      return nodesArray.map( (node, i) => {
        return <p key={i}>{node}</p>;
      });
    }

    const h5Style = {
      fontSize: '100%',
      color: '#fff',
      background: '#000',
      padding: '0.25rem',
      textAlign: 'left'
    }
    return (
      <div id="current-step-info">
      <h5 style={ h5Style }>{this.props.customerConfiguredBowModel.bowModel.name}</h5>
        { stepNodes() }
      </div>
    );
  }
}
