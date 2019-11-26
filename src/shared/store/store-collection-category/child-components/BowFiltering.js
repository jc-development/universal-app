import React, { Component } from 'react';

import _orderBy from 'lodash/orderBy';
import _uniq from 'lodash/uniq';
import _filter from 'lodash/filter';
import _startsWith from 'lodash/startsWith';
import _flatMap from 'lodash/flatMap';

import './../assets/css/bow-filtering.css';

export default class BowFiltering extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bowModelSelected: "All",
      drawWeightSelected: "All",
      drawLengthSelected: "All",
    };

    this.handleBowModelChange = this.handleBowModelChange.bind(this);
    this.handleDrawWeightChange = this.handleDrawWeightChange.bind(this);
    this.handleDrawLengthChange = this.handleDrawLengthChange.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);
  }

  handleBowModelChange(event) {
    this.setState({bowModelSelected: event.target.value}, () => {
     this.props.bowFilterChange(this.state.bowModelSelected, this.state.drawWeightSelected, this.state.drawLengthSelected)
    })
  }

  handleDrawWeightChange(event) {
    this.setState({drawWeightSelected: event.target.value}, () => {
     this.props.bowFilterChange(this.state.bowModelSelected, this.state.drawWeightSelected, this.state.drawLengthSelected)
    })
  }

  handleDrawLengthChange(event) {
    this.setState({drawLengthSelected: event.target.value}, () => {
     this.props.bowFilterChange(this.state.bowModelSelected, this.state.drawWeightSelected, this.state.drawLengthSelected)
    })
  }

  handleResetFilters() {
    this.setState({
      bowModelSelected: "All",
      drawWeightSelected: "All",
      drawLengthSelected: "All",
    }, () => {
     this.props.bowFilterChange(this.state.bowModelSelected, this.state.drawWeightSelected, this.state.drawLengthSelected)
    });
  }

  render () {

    const bowsTags = this.props.bows.map((bow) => {
      return bow.node.tags
    })

    // create array of bowModels from Shopify Bows
    const bowModelList = _orderBy(_uniq(
      _flatMap(bowsTags, (bowTags) => {
        return _filter(bowTags, (tag) => {
           const tagMatch = _startsWith(tag,'bowModel')
           if (tagMatch) {
             return tag
           }
        })
      })
    ))

    // create array of drawWeights from Shopify Bows
    const drawWeightList = _orderBy(_uniq(
      _flatMap(bowsTags, (bowTags) => {
        return _filter(bowTags, (tag) => {
           const tagMatch = _startsWith(tag,'drawWeight')
           if (tagMatch) {
             return tag
           }
        })
      })
    ))

    // create array of drawLengths from Shopify Bows
    const drawLengthList = _orderBy(_uniq(
      _flatMap(bowsTags, (bowTags) => {
        return _filter(bowTags, (tag) => {
           const tagMatch = _startsWith(tag,'drawLength')
           if (tagMatch) {
             return tag
           }
        })
      })
    ))


    const bowModelSelect = () => {
      const options = bowModelList.map((model, i) => {
        return <option key={i} value={model}>{model.substr(9)}</option>
      })
      return (
        <fieldset className="form-group">
          <label>Bow Model</label>
          <select className="form-input" value={this.state.bowModelSelected} onChange={this.handleBowModelChange}>
            <option value="All">All</option>
            {options}
          </select>
        </fieldset>
      )
    }

    const drawWeightSelect = () => {
      const options = drawWeightList.map((weight, i) => {
        return <option key={i} value={weight}>{weight.substr(11)}</option>
      })
      return (
        <fieldset className="form-group">
          <label>Draw Weight (lbs)</label>
          <select className="form-input" value={this.state.drawWeightSelected} onChange={this.handleDrawWeightChange}>
            <option value="All">All</option>
            {options}
          </select>
        </fieldset>
      )
    }

    const drawLengthSelect = () => {
      const options = drawLengthList.map((length, i) => {
        return <option key={i} value={length}>{length.substr(11)}</option>
      })
      return (
        <fieldset className="form-group">
          <label>Draw Length (inches)</label>
          <select className="form-input" value={this.state.drawLengthSelected} onChange={this.handleDrawLengthChange}>
            <option value="All">All</option>
            {options}
          </select>
        </fieldset>
      )
    }

    return (
      <div className="bow-filtering">
        <h5>Find Your Bow</h5>
        {bowModelSelect()}
        {drawWeightSelect()}
        {drawLengthSelect()}
        {this.props.emptyBowsList ?
          <div>
            <p>No Bows Found.</p>
            <button onClick={this.handleResetFilters}>Clear Selection</button>
          </div>
        : null}
      </div>
    )
  }
}
