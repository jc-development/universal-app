import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  replaceCartLineItems as replaceCartLineItemsAction,
  createCart as createCartAction
} from './../../reusable/shopify/cart/actions';

import { fetchShopifyData } from './../../reusable/shopify/api/fetchShopifyData';
import { getProductByHandle } from './../../reusable/shopify/product/graphql';

class PromoBowCaseFiftyPercent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productHandle1: "elite-crusader-1pk-bow-case-1",
      product1: null, 
      selectedVariant1: null,
      productHandle2: "elite-double-2pk-bow-case-1",
      product2: null, 
      selectedVariant2: null
    };

    this.findShopifyProduct = this.findShopifyProduct.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);

  }

  componentWillMount() {
    this.findShopifyProduct(this.state.productHandle1, 1)
    this.findShopifyProduct(this.state.productHandle2, 2)
  }

  async findShopifyProduct(productHandle, index) {
    const productFromShopify = await fetchShopifyData(getProductByHandle, productHandle);
    // console.log('productFromShopify: ', productFromShopify)
    if (productFromShopify.data.productByHandle !== null) {
      this.setState({
        [`product${index}`] : productFromShopify.data.productByHandle,
        [`selectedVariant${index}`] : productFromShopify.data.productByHandle.variants.edges[0].node
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

    const smallStyle = {
      display: "block",
      paddingTop: "10px",
      fontWeight: "500",
      fontSize: "80%"
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

    if (this.state.product1 !== null && this.state.product2 !== null) {
      return (
        <div style={formStyle}>
          <h1 style={h1Style}> Bow Case 50% Off With Purchase of Elite Bow<br></br><small style={smallStyle}>Please Choose one below</small></h1>
          {this.state.product1.availableForSale ? 
            <form>
              <img style={imgStyle} src={this.state.selectedVariant1.image.transformedSrc} alt={`50% Off Bow Case - ${this.state.product1.title}`} title={`50% Off Bow Case - ${this.state.product1.title}`} />
              <div>
                <p>{this.state.product1.title} <br></br> <span style={{fontWeight: "bold"}}>Price: ${parseFloat(this.state.selectedVariant1.priceV2.amount).toFixed(2)}</span></p>
                <button style={buttonStyle} className="add-to-cart" type="button" onClick={() => this.handleAddProductToCart(this.state.selectedVariant1.id)}>ADD TO CART</button>
              </div>
            </form>
          :
          null}
          {this.state.product2.availableForSale ?
            <form>
              <img style={imgStyle} src={this.state.selectedVariant2.image.transformedSrc} alt={`50% Off Bow Case - ${this.state.product2.title}`} title={`50% Off Bow Case - ${this.state.product2.title}`} />
              <div>
                <p>{this.state.product2.title} <br></br> <span style={{fontWeight: "bold"}}>Price: ${parseFloat(this.state.selectedVariant2.priceV2.amount).toFixed(2)}</span></p>
                <button style={buttonStyle} className="add-to-cart" type="button" onClick={() => this.handleAddProductToCart(this.state.selectedVariant2.id)}>ADD TO CART</button>
              </div>
            </form>
          :
          null} 
        </div>
        
      )
    } else {
      return null
    }
  }
}

export default connect(null, { replaceCartLineItems: replaceCartLineItemsAction, createCart: createCartAction })(PromoBowCaseFiftyPercent)