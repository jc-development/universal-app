import React, { Component } from 'react';
import { filterColors } from '../filter-colors/FilterColors';

export default class Rest extends Component {
  constructor(props) {
    super(props);

    this.showProductDetail = this.showProductDetail.bind(this);

    this.state = {
      currentHand: this.props.currentHand,
      title: null
    };

  }

  showProductDetail(rest, title) {
    this.props.selectProduct({rest: rest});

    this.setState({title});
  }

  componentDidUpdate(prevProps, nextState) {

    if (prevProps.currentHand !== this.props.currentHand) {
      this.setState({
        currentHand: this.props.currentHand
      })
    }
  }

  render() {
    // console.log('this.props rests: ', this.props);

    const isActive = (title) => {
      if (this.state.title === title) {
        return 'active';
      } else {
        null;
      }
    };

    const loadRestNodes = () => {
      let handOrientation = `${this.state.currentHand.charAt(0).toUpperCase() + this.state.currentHand.slice(1)} hand`;

      return this.props.rests.map( restArr => {
        return restArr.map( (rest, i) => {
          if (rest.node.availableForSale && (rest.node.title === handOrientation) ) return <li key={i} className={isActive(rest.node.product.title)}><img src={ rest.node.image.src } title={ rest.node.product.title } alt={ rest.node.product.title } onClick={() => this.showProductDetail(rest, rest.node.product.title)} /><span>{rest.node.product.title}</span></li>;
        });
      });
    }

    return (
      <div id="accessory-type">
        <h6>QAD HDX Arrow Rests</h6>
        <div className="container">
          <div>
            <ul className="items">
              { loadRestNodes() }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
