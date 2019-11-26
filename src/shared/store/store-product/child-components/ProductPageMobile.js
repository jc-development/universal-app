import React from 'react';
import _uniq from 'lodash/uniq';
import _find from 'lodash/find';
import _includes from 'lodash/includes';
import _reject from 'lodash/reject';
import _chunk from 'lodash/chunk'
import _some from 'lodash/some';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTruck, faShoppingCart, faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-free-solid'

export const ProductPageMobile = (props) => {

  const outOfStock = {
    color: "red",
    textTransform: "uppercase",
    fontWeight: "bold"
  }

  const disabledButton = {
    cursor: "not-allowed"
  }
  
  const routerParams = props.routerParams
  const product = props.product
  const variant = props.variant
  const variantImage = props.variantImage
  const variantQuantity = props.variantQuantity
  const handleQuantityChange = props.handleQuantityChange
  const handleOptionChange = props.handleOptionChange
  const handleAddProductToCart = props.handleAddProductToCart
  const variantOptions = props.variantOptions
  const klarna = props.klarna

  const boolSizeOption = _some(product.options, (option) => {
    return option.name === "Size"
  })
  const boolOptionLength = product.options.length === 1 ? true : false
  const onlySizeOption = boolSizeOption && boolOptionLength ? true : false

  let totalImages = product.images.length

  const productThumbImages = product.images.map((image, i) => {
    if (product.variants.length > 1 && product.variants[i].image !== null && !onlySizeOption) {
      return(
        <div className="product-img-mobile">
          <img key={image.id} src={image.transformedSrc} alt={image.altText} data-variant-id={image.id} />
        </div>
      )
    } else {
      return (
        <div className="product-img-mobile">
          <img key={image.id}  src={image.transformedSrc} alt={image.altText} />
        </div>
      )
    }
  });

  const productOptions = product.options.map((option, i) => {
    if (option.name === "Title") {
      return null
    }
    return (
      <fieldset key={option.id} className="form-group">
        <label htmlFor={option.id}>{option.name}</label>
        <select className="form-input" name={option.name} value={variantOptions !== undefined ? variantOptions[i] : '' } onChange={handleOptionChange}>
          {option.values.map((value) => {
            return <option key={option.name + "-" + value} value={value}>{value}</option>
          })}
        </select>
      </fieldset>
    )
  });

  const showQuantity = () => {
      return (
        <fieldset className="form-group">
          <label>Quantity</label>
          <input className="form-input" min="1" type="number" defaultValue={variantQuantity} onChange={handleQuantityChange}></input>
        </fieldset>
      );
  }

  const gridColumnRepeatStyle = {
    gridTemplateColumns: `repeat(${totalImages},100%)`
  }
  
  return (
    <section>
      <h3 className="free-shipping"><FontAwesomeIcon icon={faTruck} /> free shipping!</h3>
      <h2 className="product-title-mobile">{product.title}</h2>
      <div className="product-wrapper-mobile">
        <div className="product-nav-images-wrapper-mobile">
          {totalImages === 1 ? <div></div> : <FontAwesomeIcon icon={faChevronLeft} className="chevron-nav-left-mobile" onClick={props.scrollLeft} />}
            <div className="product-img-wrapper-mobile" style={gridColumnRepeatStyle} ref={props.refThumbsWrapper}>
              {productThumbImages}
            </div>
            {totalImages === 1 ? <div></div> : <FontAwesomeIcon icon={faChevronRight} className="chevron-nav-right-mobile" onClick={props.scrollRight} />}
            {totalImages === 1 ? null : <span className="image-count">{props.mobileImginView} / {totalImages}</span>}
        </div>
        <div className="product-content-wrapper">
          {klarna}
          {variant.compareAtPrice !== null && parseFloat(variant.compareAtPrice) > parseFloat(variant.price) ? <div className="variant-compare mobile-compare"><span className="sale-tag">SALE</span><h3 className="discount product-price-mobile">${variant.price}</h3><h3 className="original product-price-mobile">${variant.compareAtPrice}</h3></div> : <h3 className="product-price-mobile">${variant.price}</h3>}
          <p className="product-sku-mobile">SKU: {variant.sku}</p>
          <form className="product-form">
            {productOptions}
            {showQuantity()}
            {variant.availableForSale ?
                <button className="add-to-cart" type="button" onClick={() => handleAddProductToCart(variant.id, variantQuantity)}><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faShoppingCart} />ADD TO CART</button>
              :
              <div>
                <button className="add-to-cart" type="button" disabled="true" style={disabledButton}>ADD TO CART</button>
                <p style={outOfStock}>Out Of Stock</p>
              </div>
            }
          </form>
          <h3 className="free-shipping product-ship"><FontAwesomeIcon icon={faTruck} /> free shipping!</h3>
            <article>
              <h2 className="product-title-mobile">{product.title}</h2>
              <div className="product-description-mobile" dangerouslySetInnerHTML={{__html:product.descriptionHtml}}/>
            </article>
        </div>
      </div>
      <ol className="breadcrumbs mobile-breadcrumbs">
        <li><Link to="/">home</Link></li>
        <li><Link to="/store">store</Link></li>
        <li><Link to={"/store/" + routerParams.collection}>{routerParams.collection}</Link></li>
        <li><Link to={"/store/" + routerParams.collection + "/" + routerParams.category}>{routerParams.category}</Link></li>
        <li className="active">{routerParams.product}</li>
      </ol>
    </section>
  )
}
