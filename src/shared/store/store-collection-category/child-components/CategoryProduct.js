import React from 'react';
import { Link } from 'react-router-dom';

import './../assets/css/category-product.css';

export const CategoryProduct = (props) => {
  const productList = props.product
  const path = props.path
  const category = props.category

  const productNodes = productList.map( (product) => {
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
        if(parseFloat(variant.compareAtPrice) > parseFloat(variant.price)) {
          onSale = 1;
        }
      }
      // find lowest price of all product variants
      if (variant.price < lowestPrice) {
        lowestPrice = parseFloat(variant.price);
      }
    })

  return (
      <li className="category-product" key={product.id}>
        <Link className="category-product-link" to={path + "/" + product.handle}>
            <div className="category-product-img-wrapper">
              <img src={product.images.length === 0 ? 'https://s3.amazonaws.com/elite-website/v2/images/no-image.jpg' : product.images[0].transformedSrc} alt={`${product.title}`}/>
            </div>
          <div className="category-product-content">
            <h3 className="category-product-title">{product.title}</h3>
            {onSale !== 0 ?
              <div className="variant-compare"><span className="sale-tag">SALE</span>
                <p className="discount">{oneProductVariant !== 0 ? <h6 className="category-product-price">Starting At ${lowestPrice.toFixed(2)}</h6> : <h6 className="category-product-price">${lowestPrice.toFixed(2)}</h6>}</p>
              </div>
            : oneProductVariant !== 0 ? <h6 className="category-product-price">Starting At ${lowestPrice.toFixed(2)}</h6> : <h6 className="category-product-price">${lowestPrice.toFixed(2)}</h6>}
          </div>
        </Link>
      </li>
    )
  });

  return (
    <ul className="category-product-list-wrapper">
      {productNodes}
    </ul>
  )
}
