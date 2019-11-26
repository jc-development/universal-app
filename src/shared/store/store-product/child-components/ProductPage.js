import React from 'react';
import _uniq from 'lodash/uniq';
import _find from 'lodash/find';
import _includes from 'lodash/includes';
import _reject from 'lodash/reject';
import _chunk from 'lodash/chunk'
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTruck, faShoppingCart } from '@fortawesome/fontawesome-free-solid'

export const ProductPage = (props) => {

  const outOfStock = {
    color: "red",
    textTransform: "uppercase",
    fontWeight: "bold"
  }

  const disabledButton = {
    cursor: "not-allowed"
  }
  // console.log('router params: ', props.routerParams)
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

  const totalImages = product.images.length

  const productImages = product.images.map((image, i) => {
    if (product.variants.length > 1 && product.variants[i].image !== null) {
      return <picture><img style={totalImages === 1 ? {width: "70%"} : null } key={image.id} src={image.transformedSrc} alt={image.altText} data-variant-id={image.id} onClick={handleOptionChange} /></picture>
    } else {
      return <picture><img style={totalImages === 1 ? {width: "70%"} : null } key={image.id} src={image.transformedSrc} alt={image.altText} /></picture>
    }
  });

  const productOptions = product.options.map((option, i) => {
    if (option.name === "Title") {
      return null
    }
    const variantValue = variantOptions !== undefined ? variantOptions[i] : ''
    return (
      <fieldset key={option.id} className="form-group">
        <label htmlFor={option.id}>{option.name}</label>
        {option.values.map((value, n) => {
          return <label htmlFor={`${option.name}-${n}`} className={variantValue === value ? "option-btn checked" : "option-btn"} key={option.name + "-" + value} ><input type="radio" id={`${option.name}-${n}`} name={option.name} value={value} onChange={handleOptionChange}/>{value}</label>
        })}
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

  return (
    <section>
      <h3 className="free-shipping"><FontAwesomeIcon icon={faTruck} /> free shipping!</h3>
      <ol className="breadcrumbs desktop">
        <li><Link to="/">home</Link></li>
        <li><Link to="/store">store</Link></li>
        <li><Link to={"/store/" + routerParams.collection}>{routerParams.collection}</Link></li>
        <li><Link to={"/store/" + routerParams.collection + "/" + routerParams.category}>{routerParams.category}</Link></li>
        <li className="active">{routerParams.product}</li>
      </ol>
      <div className="product-wrapper">
        <div style={totalImages === 1 ? {gridTemplateColumns: "1fr"} : null } className="product-images-wrapper">
          {props.selectedVariantImageShow ? <div className="selected-image-wrapper">
          <span className="selected-image-close" onClick={props.closeSelectedVariantImage}>CLOSE IMAGE</span>
            <img  className="selected-image" src={variantImage} />
          </div> : null}
          {productImages}
        </div>
        <div className="product-content-wrapper">
          <h1 className="product-title">{product.title}</h1>
          {klarna}
          {variant.compareAtPrice !== null && parseFloat(variant.compareAtPrice) > parseFloat(variant.price) ? <div className="variant-compare"><span className="sale-tag">SALE</span><h3 className="discount product-price">${variant.price}</h3><h3 className="original product-price">${variant.compareAtPrice}</h3></div> : <h3 className="product-price">${variant.price}</h3>}
          <p className="product-sku">SKU: {variant.sku}</p>
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
           <article className="product-description" dangerouslySetInnerHTML={{__html:product.descriptionHtml}}/> 
        </div>
      </div>
    </section>
  )
}
