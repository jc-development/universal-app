import React, { Component } from 'react';
import _uniq from 'lodash/uniq';
import _find from 'lodash/find';
import _chunk from 'lodash/chunk'

import { Link } from 'react-router-dom';

import './../assets/css/shop-more-list.css';

import { Carousel } from 'react-responsive-carousel';
if (process.env.IS_BROWSER) {
  require('react-responsive-carousel/lib/styles/carousel.min.css')
}

export default class ShopMoreList extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const totalCategories = this.props.products.length
    const collectionNodes = this.props.products.map( (collection) => {
      
      let onSale = 0; // 0 - off 1 - on | display on sale tag
      let lowestPrice = parseFloat(10000); // set fictitious lowest price
      let oneProductVariant = 0; // 0 - off 1 - on | display on "starting at"

      return (
        <div onClick={this.props.collectionClick} className="category" key={collection.id}>
          <Link to={"/store/"+ this.props.handle + "/" + collection.handle}>
            <div className="category-img-wrapper">
              <img src={collection.image !== null ? collection.image.transformedSrc : "https://s3.amazonaws.com/elite-website/v2/images/no-image.jpg"}  alt={`Elite Archery ${collection.title}`}/>
            </div>
            <div className="category-content">
              <h3 className="category-title">{collection.title}</h3>
              {collection.products !== undefined && collection.products.length > 0 ?
                collection.products.map((product, i) => {
                  // check if more than one product exists
                  if ( i > 0 && oneProductVariant !== 1) {
                    oneProductVariant = 1
                  }
                  product.variants.map((variant, i) => {
                    // check if more than one variant exists and whether multiple products exist
                    if ( i > 0 && oneProductVariant !== 1) {
                      oneProductVariant = 1
                    }
                    // check if product and its variants are on sale
                    if (variant.compareAtPrice !== null) {
                      if(parseFloat(variant.compareAtPrice) > parseFloat(variant.price)) {
                        onSale = 1;
                      }
                    }
                    // find lowest price of all product variants
                    if (variant.price < lowestPrice) {
                      lowestPrice = parseFloat(variant.price);
                    }
                  })
                })
              : null }
              {collection.products !== undefined && collection.products.length > 0 ?
                <div>
                  {oneProductVariant !== 0 ? <h6 className="category-price">Starting At ${lowestPrice.toFixed(2)}</h6> : <h6 className="category-price">${lowestPrice.toFixed(2)}</h6>}
                  {onSale !== 0 ? <div className="variant-compare"><span className="sale-tag">SALE</span></div> : null}
                </div>
              : null }
              <p>Explore</p>
            </div>
          </Link>
          </div>
        )
      });

    return (
      <article className="shop-more-list-wrapper">
        {this.props.title !== undefined ? <h2 className="collection-title">{this.props.title}</h2> : null}
        <div className="shop-more-category-list-wrapper">
          <div className={`${this.props.handle} category-wrapper`} ref={el => this.featuredShopMoreWrapper = el}>
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
              {collectionNodes}
              </Carousel>
            :  collectionNodes }
          </div>
        </div>
      </article>
    )
  }
}
