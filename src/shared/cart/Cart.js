import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import _find from 'lodash/find'
import { Link } from 'react-router-dom';

import KlarnaImage from './assets/images/klarna-logo.png';
import CartItem from './child-components/CartItem'

import PromoFreeShirt from './child-components/PromoFreeShirt'
import PromoBowCaseFiftyPercent from './child-components/PromoBowCaseFiftyPercent'

import { 
  updateCart as updateCartAction,
  applyDiscountCode as applyDiscountCodeAction,
  removeDiscountCode as removeDiscountCodeAction,
  replaceCartLineItems as replaceCartLineItemsAction,
  removeDiscountCodeError as removeDiscountCodeErrorAction
} from './../reusable/shopify/cart/actions';

// import MonthlyPayment from './../klarna/MonthlyPayment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

import { fetchShopifyData } from '../reusable/shopify/api/fetchShopifyData';
import { replaceCartLineItems } from '../reusable/shopify/cart/graphql';


import './assets/css/cart.css';

class Cart extends Component {

  constructor(props) {
  super(props)

    this.state = {
      showSecondaryCheckout: false,
    }

    this.modifyCartItem = this.modifyCartItem.bind(this);
    this.openCheckout = this.openCheckout.bind(this);

    this.handleResizeCheckForSecondaryCheckout = this.handleResizeCheckForSecondaryCheckout.bind(this);
    this.updateCartAndCheckout = this.updateCartAndCheckout.bind(this);
    this.handleDiscountCodeChange = this.handleDiscountCodeChange.bind(this);
  }


  async updateCartAndCheckout(checkoutId, lineItems) {
    const w = window.open('', '_blank');
    const addLineItems = {checkoutId, lineItems};
    const cart = await fetchShopifyData(replaceCartLineItems, addLineItems);

    if (cart.errors) { 
      console.log('cart errors: ', cart.errors) // query level error
    } else { 

      const cartData = cart.data.checkoutLineItemsReplace

      if (cartData.userErrors.length > 0) {
        console.log('cart userErrors: ', cartData.userErrors) // user level error
    
      } else {
        const cartObject = {
          id: cartData.checkout.id,
          webUrl: cartData.checkout.webUrl,
          lineItems: cartData.checkout.lineItems.edges.length > 0 ? cartData.checkout.lineItems.edges.map(lineItem => { return lineItem.node }) : [],
          lineItemsSubtotalPrice: cartData.checkout.lineItemsSubtotalPrice.amount,
          subtotalPrice: cartData.checkout.subtotalPriceV2.amount,
          totalPrice: cartData.checkout.totalPriceV2.amount,
          discountApplications: cartData.checkout.discountApplications.edges.length > 0 ? cartData.checkout.discountApplications.edges.map(app => { return app.node }) : [],
          checkoutReady: true
        }
        // console.log('cartObject replace: ', cartObject)
        w.location = this.props.cart.webUrl
        // yield put({
        //   type: REPLACE_CART_LINE_ITEMS_SUCCEEDED,
        //   payload: cartObject
        // });

      }
      
    }
  }

  modifyCartItem(cartItemAction, lineItemVariantId, reductionQuantity) {

    let lineItems = this.props.cart.lineItems.map( (line_item) => {
      let variantObject = {
        variantId: line_item.variant.id,
        quantity: line_item.quantity,
        customAttributes: line_item.customAttributes
      }
     return variantObject
    })

    const foundItem = lineItems.find(item => item.variantId === lineItemVariantId)

    switch(cartItemAction) {
      case "decrementQuantity":
          if(foundItem.quantity - 1 > 0) {
            foundItem.quantity = foundItem.quantity - 1
          } else {
            lineItems = lineItems.filter(item => item.variantId !== lineItemVariantId)
          }
          this.props.updateCart(lineItems)
        break;
      case "incrementQuantity":
          foundItem.quantity = foundItem.quantity + 1
          this.props.updateCart(lineItems)
        break;
      case "removeLineItemFromCart":
          lineItems = lineItems.filter(item => item.variantId !== lineItemVariantId)
          this.props.updateCart(lineItems)
        break;
      case "updateQuantityPromoBowcase":
          if(foundItem.quantity - reductionQuantity > 0) {
            // console.log('update quantity of a bowcase in the cart')
            foundItem.quantity = foundItem.quantity - reductionQuantity
          } else {
            // console.log('remove a bowcase from the cart')
            lineItems = lineItems.filter(item => item.variantId !== lineItemVariantId)
          }
          this.props.updateCart(lineItems)
        break;
      default:

    }
  }

  openCheckout() {
    if (this.props.cart.lineItems.length > 0) {
      let lineItems = this.props.cart.lineItems.map( (line_item) => {
        let variantObject = {
          variantId: line_item.variant.id,
          quantity: line_item.quantity,
          customAttributes: line_item.customAttributes
        }
       return variantObject
      })
      if (this.props.cart.checkoutReady) {
        // console.log('normal window open')
        window.open(this.props.cart.webUrl)
      } else if (!this.props.cart.checkoutReady) {
        // console.log('generator run')
        this.updateCartAndCheckout(this.props.cart.id, lineItems)
      }
    } else {
      alert('Please Add Items to Your Cart.')
    }
  }

  handleResizeCheckForSecondaryCheckout() {
    if (window.innerWidth <= 950 && !this.state.showSecondaryCheckout) {
      this.setState({
        showSecondaryCheckout: true
      });
    } else if(window.innerWidth >= 951 && this.state.showSecondaryCheckout) {
      this.setState({
        showSecondaryCheckout: false
      })
    }
  }

  handleDiscountCodeChange() {
    if (this.props.cart.discountError && this.props.cart.discountError !== null && this.discountCode.value.length === 0) {
      this.props.removeDiscountCodeError()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeCheckForSecondaryCheckout);
    this.handleResizeCheckForSecondaryCheckout();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeCheckForSecondaryCheckout);
    if (this.props.cart.discountError && this.props.cart.discountError !== null) {
      this.props.removeDiscountCodeError()
    }
  }

  render () {
    
    const secondaryCheckoutMobile = () => {
      return (
        <div className='cart-secondary-checkout'>
          <div id="klarna-reminder">
            <h6>Financing Available on Checkout through</h6>
            <img src={KlarnaImage} alt="Klarna logo - Klarna offers financing for all products sold on Elite Archery."/>
          </div>
          <div className="price-with-button">
            <h5 className='total-price'><span>Total:</span> ${this.props.cart !== null ? parseFloat(this.props.cart.subtotalPrice).toFixed(2) : null}</h5>
            <button className="cart-checkout" role='button' onClick={this.openCheckout}>CHECKOUT</button>
          </div>
        </div>
      )
    }

    let itemNodes
    if (this.props.cart !== null) {
      if (this.props.cart.lineItems.length > 0) {
         itemNodes = this.props.cart.lineItems.map( (line_item, i) => {
          return (
            <CartItem
            key={i}
            line_item={line_item}
            modifyCartItem={this.modifyCartItem}
          />
          )
         })
      }
    }

    const shouldPromoLoad = () => {
      if (this.props.cart !== null) {
        if (this.props.cart.lineItems.length > 0) {
          const ritual35InCart = this.props.cart.lineItems.find((line_item) => {
            return line_item.title.includes("Ritual 35") && line_item.variant.product.productType === "Bow"
          })
          const promoItemInCart = this.props.cart.lineItems.find((line_item) => {
            return line_item.title.includes('Grunt Style "We The People" Tee') && line_item.variant.product.productType === "Shirt"
          })
          if(ritual35InCart && !promoItemInCart) {
            return <PromoFreeShirt cart={this.props.cart} />
          } else if(!ritual35InCart && promoItemInCart) {
            this.modifyCartItem("removeLineItemFromCart", promoItemInCart.variant.id)
          }
        }
      }
    }

    const shouldPromoBowCaseLoad = () => {
      if (this.props.cart !== null) {
        if (this.props.cart.lineItems.length > 0) {
          const bowInCart = this.props.cart.lineItems.filter((line_item) => {
            return line_item.variant.product.productType === "Bow"
          })

          const bowCount = bowInCart.reduce((acc, current) => {
            return acc + current.quantity
          }, 0)

          const promoSingleBowCaseInCart = this.props.cart.lineItems.find((line_item) => {
            return line_item.title.includes('Elite Single Bowcase by Legend') && line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzY3NjM4NzI4NzA5MQ=="
          })

          const promoDoubleBowCaseInCart = this.props.cart.lineItems.find((line_item) => {
            return line_item.title.includes('Elite Double Bowcase by Legend') && line_item.variant.id === "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzY3NjM4Nzk0MjQ1MQ=="
          })

          const bowCaseCount = (promoSingleBowCaseInCart ? promoSingleBowCaseInCart.quantity : 0) + (promoDoubleBowCaseInCart ? promoDoubleBowCaseInCart.quantity : 0)
          
          // console.log('bow in cart: ', bowInCart)
          // console.log('single bowcase 50% off: ', promoSingleBowCaseInCart)
          // console.log('double bowcase 50% off: ', promoDoubleBowCaseInCart)
          // console.log('bowCount: ', bowCount)
          // console.log('bowCaseCount: ', bowCaseCount)

          // if bows in cart and bow cases less than bows in cart then show bow cases
          if(bowCount > 0 && bowCaseCount < bowCount) {
            return <PromoBowCaseFiftyPercent cart={this.props.cart} />
          
          // else if bows in cart is less than bow 
          } else if(bowCount > 0 && bowCaseCount > bowCount) {
            const reduction = bowCaseCount - bowCount;
            if(promoSingleBowCaseInCart && promoSingleBowCaseInCart.quantity >= reduction) {
              this.modifyCartItem("updateQuantityPromoBowcase", promoSingleBowCaseInCart.variant.id, reduction)
            } 
            if(promoDoubleBowCaseInCart && promoDoubleBowCaseInCart.quantity >= reduction) {
              this.modifyCartItem("updateQuantityPromoBowcase", promoDoubleBowCaseInCart.variant.id, reduction)
            }
          } else if(bowInCart.length === 0) {
            if(promoSingleBowCaseInCart) {
              this.modifyCartItem("removeLineItemFromCart", promoSingleBowCaseInCart.variant.id)
            } 
            if(promoDoubleBowCaseInCart) {
              this.modifyCartItem("removeLineItemFromCart", promoDoubleBowCaseInCart.variant.id)
            }
          }
        }
      }
    }
    
    return (
      <section id="cart" className='width-85 center-content'>
        <h1>Shopping Cart</h1>
     
        {shouldPromoBowCaseLoad()}
        <div className="cart-content-wrapper">
          {this.state.showSecondaryCheckout && itemNodes ? secondaryCheckoutMobile() : null}
          <div className='cart-left'>
            {itemNodes}
          </div>
          <div className='cart-right'>
            <div className="discount-wrapper">
              {this.props.cart.discountApplications.length > 0 ? 
              <p>
                Applied Discount Code:
                <span className="applied-code">
                  {this.props.cart.discountApplications[0].code}
                  <FontAwesomeIcon className="remove-icon" icon={faTimes} onClick={() => this.props.removeDiscountCode(this.props.cart.id)}/>
                </span>
              </p>
              :
              <Fragment>
                <p >Have a Discount Code?</p>
                <input type="text" placeholder="enter code here" style={this.props.cart.discountError && this.props.cart.discountError !== null ? {borderColor: "red"} : null} ref={el => this.discountCode = el} onChange={this.handleDiscountCodeChange}/>
                <button onClick={() => this.props.applyDiscountCode(this.props.cart.id, this.discountCode.value)}>Apply Discount</button>
                {this.props.cart.discountError && this.props.cart.discountError !== null ? <span style={{color: "red", display: "block", marginTop: "0.5rem"}}>Discount code is invalid. <span style={{color: "red", display: "block", marginTop: "0.5rem", lineHeight: "1.2"}}>Please contact customer service:<br></br><a href="tel:8775035483" style={{color: "red", textDecoration: "underline"}}>(877) 503-5483</a></span></span> : null}
              </Fragment>
              }
            </div>
            {parseFloat(this.props.cart.subtotalPrice) < parseFloat(this.props.cart.lineItemsSubtotalPrice) ? 
              <h5 className='total-price original'><span>Total:</span> ${this.props.cart !== null ? parseFloat(this.props.cart.lineItemsSubtotalPrice).toFixed(2) : null}</h5>
            : null
            }
            <h5 className='total-price'><span>Total:</span> ${this.props.cart !== null ? parseFloat(this.props.cart.subtotalPrice).toFixed(2) : null}</h5>
            <button className="cart-checkout" role='button' onClick={this.openCheckout}>CHECKOUT</button>
            <div id="klarna-reminder">
              <h6>Financing Available on Checkout through</h6>
              <img src={KlarnaImage} alt="Klarna logo - Klarna offers financing for all products sold on Elite Archery."/></div>
           </div>
        </div>
        {shouldPromoLoad()}
      </section>
    )
  }
}


const mapStateToProps = ({ shopify }) => {
  return {
    cart: shopify.cart
  }
}

export default connect(mapStateToProps, { 
  updateCart: updateCartAction,
  applyDiscountCode: applyDiscountCodeAction,
  removeDiscountCode: removeDiscountCodeAction,
  replaceCartLineItems: replaceCartLineItemsAction,
  removeDiscountCodeError: removeDiscountCodeErrorAction
})(Cart);
