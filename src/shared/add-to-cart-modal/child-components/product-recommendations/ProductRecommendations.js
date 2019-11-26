import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './assets/css/product-recommendations.css';

import {
  fetchProductRecommendations as fetchProductRecommendationsAction,
} from './actions';

import apparelIconSrc from './../../assets/images/apparel.jpg';

class ProductRecommendations extends Component {

  constructor(props) {
  super(props);

  }

  componentDidMount() {
    this.props.fetchProductRecommendations(this.props.productId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.props.fetchProductRecommendations(this.props.productId)
    }
  }

  render () {
    const productRecommendations = () => {
      const productRecommendationsList = this.props.productRecommendations.map(product => {
        if(product.productType === "Bow") {
          // check string for substring contained in array
          const bowFamilyArray = ['valor', 'ritual', 'victory', 'echelon', 'enlist', 'revol', 'tempo']
          const productTitle = product.title;
          const bowFamilyFound = bowFamilyArray.find(bowFamily => productTitle.toLowerCase().includes(bowFamily))
          return (
            <li>
              <Link to={`/elite-bows/${bowFamilyFound}/buy`}>
                <div className="image-container" ><img src={product.image.src} /></div>
                <p>{product.title}</p>
              </Link>
            </li>
          )
        } else {
          return (
            <li>
              <Link to={`/store/${product.mainCategory}/${product.subCategory}/${product.handle}`}>
                <div className="image-container" ><img src={product.image.src} /></div>
                <p>{product.title}</p>
              </Link>
            </li>
          )
        }
      })
      return <ul>{productRecommendationsList}</ul>
    }
    return (
      <div className="product-recommendations">
        <h4>YOU MAY ALSO LIKE</h4>
        {this.props.productRecommendations.length > 0 ? productRecommendations() : <img style={{width: "100%", marginTop: "1rem"}} src={apparelIconSrc} alt="Shop Elite Archery Apparel" />}
      </div>
    )
  }
}

const mapStateToProps = ({ productRecommendations }) => {
  return {
    productRecommendations
  };
};

export default connect(mapStateToProps, {fetchProductRecommendations: fetchProductRecommendationsAction})(ProductRecommendations)