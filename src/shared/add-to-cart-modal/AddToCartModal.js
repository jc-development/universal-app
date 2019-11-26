import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { ShirtUpseller } from './child-components/ShirtUpseller';
import ProductRecommendations from './child-components/product-recommendations/ProductRecommendations';

import TweenMax from 'gsap/TweenMax';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/fontawesome-free-regular';

import './assets/css/add-to-cart-modal.css';

export default class AddToCartModal extends Component {

  constructor(props) {
  super(props);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    TweenMax.to(".hidden-modal", 0, {display: "none"})
  }

  render () {

    return (
      <div className='hidden-modal' onClick={this.handleModalClose}>
        <div className='notify'>
          <FontAwesomeIcon icon={faWindowClose} className="close-icon" size="2x" />
          <div className="continue">
            <img src={this.props.productImage} alt={'Elite Archery - ' + this.props.productTitle} />
            <p>Added to your shopping cart</p>
            <h5>{this.props.productTitle}</h5>
            <Link role="button" to="/store" onClick={this.handleModalClose} className="shirt-link">Continue Shopping</Link>
            <Link role="button" to='/cart' className="shirt-link">Go To Shopping Cart</Link>
          </div>
          <div className="upsell">
            <ProductRecommendations
              productId={this.props.productId}
            />
          </div>
        </div>
      </div>
    )
  }
}

{/* <ShirtUpseller
bowSKU={this.props.bowModelSKU}
/>
{this.props.relatedProducts} */}