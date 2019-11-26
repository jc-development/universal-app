import React, { Component } from 'react';

import _find from 'lodash/find';
import _includes from 'lodash/includes';
import { Link } from 'react-router-dom';

import './../assets/css/featured-product-row.css';

import { Carousel } from 'react-responsive-carousel';
if (process.env.IS_BROWSER) {
  require('react-responsive-carousel/lib/styles/carousel.min.css')
}

export default class FeaturedProductRow extends Component {

  constructor(props) {
    super(props);

  }

  
  render() {

    const totalFeaturedProducts = this.props.featuredProducts.length;
    const featuredProductNodes = this.props.featuredProducts.map((product) => {
      const truncatedProdDescription = product.description.replace(product.description.slice(200), "...")
      let productLifestyleImage
      // check if we have product images and if one is lifestyle then add as main image
      if (product.images.length > 0) {
        const getLifestyleImage = _find(product.images, (lifestyleImage) => {
          const lowerCaseImageString = lifestyleImage.transformedSrc.toLowerCase();
          return _includes(lowerCaseImageString, 'lifestyle')
        })
        if(getLifestyleImage) {
          productLifestyleImage = getLifestyleImage.transformedSrc;
        } else {
          productLifestyleImage = product.images[0].transformedSrc;
        }
      }

      let onSale = 0; // 0 - off 1 - on | display on sale tag
      let lowestPrice = parseFloat(10000); // set fictitious lowest price
      let oneProductVariant = 0; // 0 - off 1 - on | display on "starting at"

      product.variants.map((variant, i) => {
        // check if more than one variant exists and whether multiple products exist
        if ( i > 0 && oneProductVariant !== 1) {
          oneProductVariant = 1
        }
        // check if product and its variants are on sale
        if (variant.compareAtPrice !== null) {
          onSale = 1;
        }
        // find lowest price of all product variants
        if (variant.price < lowestPrice) {
          lowestPrice = parseFloat(variant.price);
        }
      })

      return (
          <li key={product.id} className="featured-product">
            <Link to={"/store/"+  this.props.collectionHandle + "/" + this.props.featuredHandle + "/" + product.handle}>
              <div className="featured-image-wrapper"><img className="img-responsive featured-image" src={productLifestyleImage !== undefined ? productLifestyleImage : "http://via.placeholder.com/300x500"}  alt={`${product.title}`}/></div>
              <div className="featured-content">
                <h3 className="featured-title">{product.title}</h3>
                {oneProductVariant !== 0 ? <h6 className="featured-price">Starting At ${lowestPrice.toFixed(2)}</h6> : <h6 className="featured-price">${lowestPrice.toFixed(2)}</h6>}
                {onSale !== 0 ? <div className="variant-compare"><span className="sale-tag">SALE</span></div> : null }
                <p className="featured-description">{truncatedProdDescription}</p>
              </div>
            </Link>
          </li>
        )
      });

    return (
      <div className={this.props.classBackgroundColor ? "featured-products-wrapper " + this.props.classBackgroundColor : "featured-products-wrapper"}>
        <div>
          <h3>{this.props.featuredTitle}</h3>
          <nav>
            <ul>
              <li><Link to={"/store/"+  this.props.collectionHandle} role="button" type="button">SHOP NOW</Link></li>
            </ul>
          </nav>
        </div>
        <div className="featured-products-list-wrapper">
          <ul className="featured-products-list" ref={el => this.featuredProductWrapper = el}>
            {this.props.isMobile ? 
              <Carousel 
                showArrows 
                showThumbs={false} 
                showIndicators={false} 
                infiniteLoop 
                autoPlay 
                stopOnHover 
                swipeable 
                centerMode
                centerSlidePercentage={90}
                statusFormatter={(current, total) => `${current} / ${total}`}
                interval={3000}
                transitionTime={750}
              >
              {featuredProductNodes}
              </Carousel>
            : featuredProductNodes}
          </ul>
        </div>
      </div>
    )
  }
}
