import React, { Component } from 'react';

import './assets/css/klarna.css';

export default class MonthlyPayment extends Component {

  constructor() {
    super();

    this.state = {
      currentId: null,
      currentPrice: null,
      updating: false
    };

    this.handleSettingData = this.handleSettingData.bind(this);
    this.handleTotalPricePlusAccessories = this.handleTotalPricePlusAccessories.bind(this);
  }

  componentDidMount() {
    this.handleSettingData()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id || prevProps.accessories !== this.props.accessories) {
      this.handleSettingData()
    }
  }

  handleSettingData() {

    const checkPrice = this.props.accessories ? this.handleTotalPricePlusAccessories() : this.props.amount

    this.setState({
      currentId: this.props.id,
      currentPrice: checkPrice,
      updating: true
    }, () => {
      this.setState({
        updating: false
      }, () => {
        if (typeof window.KlarnaUpstream !== 'undefined') {
          // window.KlarnaUpstream.init();
          window.KlarnaUpstream.load(`#${this.state.currentId}`, this.state.currentPrice );
        }
      })
    })
  }

  handleTotalPricePlusAccessories() {
    const bowMsrp = parseFloat(this.props.amount / 100)
    bowMsrp.toFixed(2)
    const iterateThroughAccessoryArray = (accessoryTypeArray) => {
      if(accessoryTypeArray.length > 0) {
        const itemPrices = accessoryTypeArray.map((item) => {
          const decimal = parseFloat(item.node.price)
          return decimal
        })
        const totalPrice  = itemPrices.reduce((total , itemPrice) => total + itemPrice)
        return totalPrice
      } else {
        return 0.00
      }
    }
    const rests = iterateThroughAccessoryArray(this.props.accessories.arrowRests)
    const arrows = iterateThroughAccessoryArray(this.props.accessories.arrows)
    const bowCases = iterateThroughAccessoryArray(this.props.accessories.bowCases)
    const quivers = iterateThroughAccessoryArray(this.props.accessories.quivers)
    const slings = iterateThroughAccessoryArray(this.props.accessories.slings)
    const stabilizers = iterateThroughAccessoryArray(this.props.accessories.stabilizers)
    const bowAccTotal = bowMsrp + rests + arrows + bowCases + quivers + slings + stabilizers
    const convertForKlarna = parseInt(bowAccTotal.toFixed(2).replace(".",""), 10)

    return convertForKlarna
  }

  render() {
 
    if(this.state.currentId !== null && !this.state.updating) {
      return (
        <div className={this.props.className}>
          <a
            className="klarna-upstream"
            id={this.state.currentId}
            href="javascript:void(0)"
            data-merchant-id="N100242"
            data-snippet="StandardMonthlyPrice"
            data-amount={this.state.currentPrice}
          ></a>
        </div>
      );
    } else {
      return null
    }
  }
}
