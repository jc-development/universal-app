import React, { Component } from 'react';

import { filterColors } from '../filter-colors/FilterColors';

export default class Sling extends Component {
  constructor() {
    super();

    this.showProductDetail = this.showProductDetail.bind(this);

    this.state = {
      title: null
    };
  }

  showProductDetail(sling, title) {
    this.props.selectProduct({sling: sling});

    this.setState({title});
  }

  render() {
    // console.log('this.props slings: ', this.props);

    const isActive = (title) => {
      if (this.state.title === title) {
        return 'active';
      } else {
        null;
      }
    }

    const loadSlingNodes = () => {
      return this.props.slings.map( slingArr => {
        return slingArr.map( (sling, i) => {
          if (sling.node.availableForSale) return <li key={i} className={isActive(sling.node.product.title)}><img src={ sling.node.image.src } title={ sling.node.product.title} alt={ sling.node.product.title } onClick={() => this.showProductDetail(sling, sling.node.product.title)} /><span>{sling.node.product.title}</span></li>;
        });
      });
    }

    return (
      <div id="accessory-type">
        <h6>Wrist Slings</h6>
        <div className="container">
          <div>
            <ul className="items">
              { loadSlingNodes() }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
