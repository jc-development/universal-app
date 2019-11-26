import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  replaceCartLineItems as replaceCartLineItemsAction,
  createCart as createCartAction
} from './../../reusable/shopify/cart/actions';

import { fetchShopifyData } from './../../reusable/shopify/api/fetchShopifyData';
import { getProductByHandle } from './../../reusable/shopify/product/graphql';

class PromoFreeShirt extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productHandle: "grunt-style-we-the-people-tee", //change this if we want to change product that we get from Shopify
      product: null, 
      selectedVariant: null
    };

    this.findShopifyProduct = this.findShopifyProduct.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);

  }

  componentWillMount() {
    this.findShopifyProduct(this.state.productHandle)
  }

  async findShopifyProduct(productHandle) {
    const productFromShopify = await fetchShopifyData(getProductByHandle, productHandle);
    if (productFromShopify.data.productByHandle !== null) {
      this.setState({
        product: productFromShopify.data.productByHandle,
        selectedVariant: productFromShopify.data.productByHandle.variants.edges[0].node
      })
    }
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions =  this.state.selectedVariant.selectedOptions

    selectedOptions[target.name] = target.value;

    const selectedVariant = this.state.product.variants.edges.find((variant) => {
      return variant.node.selectedOptions.every((selectedOption) => {
        return selectedOptions[selectedOption.name] === selectedOption.value;
      });
    }).node;

    this.setState({
      selectedVariant: selectedVariant
    })
  }

  handleAddProductToCart(variantId) {
    let lineItems = this.props.cart.lineItems.map( (line_item) => {
      let variantObject = {
        variantId: line_item.variant.id,
        quantity: line_item.quantity,
        customAttributes: line_item.customAttributes
      }
     return variantObject
    })

    const foundItem = lineItems.find(item => item.variantId === variantId)

    if (foundItem) {
      foundItem.quantity = foundItem.quantity + 1
    } else {
      lineItems.push({variantId, quantity: parseInt(1, 10)});
    }
    // console.log('lineItems Product: ', lineItems)
    if(this.props.cart === "") {
      this.props.createCart(lineItems)
    } else {
      this.props.replaceCartLineItems(this.props.cart.id, lineItems)
    }
  } 

  render () {
    // console.log('this.props: ', this.props)
    // console.log('this.state: ', this.state)
    
    const formStyle = {
      padding: "1rem 0",
      margin: "1rem",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    }

    const h1Style = {
      marginTop: "0",
      fontSize: "2rem",
      flex: "0 1 100%"
    }

    const imgStyle = {
      width: "auto",
      height: "auto",
      display: "block",
      margin: "0 auto",
      maxHeight: "200px",
      maxWidth: "200px",
      margin: "1rem 2rem"
    }

    const buttonStyle = {
      fontFamily: "Roboto Condensed",
      fontWeight: "700",
      background: "#337ab7",
      border: "none",
      color: "#fff",
      padding: "1rem",
      textTransform: "uppercase"
    }

    if (this.state.product !== null && this.state.product.availableForSale) {
      const productOptions = this.state.product.options.map((option, i) => {
        if (option.name === "Title") {
          return null
        }
        const variantOptions = Object.values(this.state.selectedVariant.selectedOptions)
        return (
          <fieldset key={option.id} className="form-group">
            <label htmlFor={option.id}>{option.name}</label>
            <select className="form-input" name={option.name} value={variantOptions !== undefined ? variantOptions[i].value : '' } onChange={this.handleOptionChange}>
              {option.values.map((value) => {
                return <option key={option.name + "-" + value} value={value}>{value}</option>
              })}
            </select>
          </fieldset>
        )
      });
      return (
        <form style={formStyle}>
          <h1 style={h1Style}> Free Grunt Style "We The People" Shirt With Purchase of Ritual 35 Bow</h1>
          <img style={imgStyle} src={this.state.selectedVariant.image.transformedSrc} alt={`Free Shirt - ${this.state.product.title}`} title={`Free Shirt - ${this.state.product.title}`} />
          <div>
            {productOptions}
            <button style={buttonStyle} className="add-to-cart" type="button" onClick={() => this.handleAddProductToCart(this.state.selectedVariant.id)}>ADD TO CART</button>
          </div>
        </form>
      )
    } else {
      return null
    }
  }
}

export default connect(null, { replaceCartLineItems: replaceCartLineItemsAction, createCart: createCartAction })(PromoFreeShirt)