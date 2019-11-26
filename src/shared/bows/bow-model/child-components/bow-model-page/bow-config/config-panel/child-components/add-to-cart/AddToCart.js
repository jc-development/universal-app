import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Cart } from '../../../../../../../../app/routes';

import SelectDealer from './select-dealer/SelectDealer';
import { selectDealer as selectDealerAction } from './select-dealer/actions';

import { 
  replaceCartLineItems as replaceCartLineItemsAction,
  createCart as createCartAction
} from '../../../../../../../../reusable/shopify/cart/actions';
import { fetchShopifyData } from '../../../../../../../../reusable/shopify/api/fetchShopifyData';
import { getProductByHandle } from '../../../../../../../../reusable/shopify/product/graphql';

import AssistanceForm from './assistance-form/AssistanceForm';

import { ContinueToCart } from './continue-to-cart/ContinueToCart';

class AddToCart extends Component {

  constructor(props) {
    super(props);

    this.addBowToCart = this.addBowToCart.bind(this);
    this.handleAssistanceFormClose = this.handleAssistanceFormClose.bind(this);
    this.handleSelectDealerReset = this.handleSelectDealerReset.bind(this);

    this.state = {
      go: false,
      assistanceFormActive: false,
      showContinueToCart: false,
    }

  }

  componentDidMount() {
    if(this.props.selectedDealer.dealerName !==  "N/A") {
      this.setState({showContinueToCart: true})
    }
  }

  addBowToCart() {
    const buildDynamicSKU = () => {

      const customerConfiguredBow = this.props.customerConfiguredBowModel;

      const customerHandOrientation = `${customerConfiguredBow.hand === "right" ? 'rh' : 'lh'}`;

      const drawlengthForSKU = customerConfiguredBow.bowSku === '20kure' || customerConfiguredBow.bowSku === '20rzlt' ? '00.0' : customerConfiguredBow.length
      const shopifyDynamicSKU = `${customerConfiguredBow.bowSku +                         /* model */
                                   customerConfiguredBow.weight +                         /* weight */
                                   customerConfiguredBow.riserColor +                     /* riser color */
                                   customerConfiguredBow.limbColor +                      /* limb color */
                                   drawlengthForSKU +                                     /* draw length */
                                   customerHandOrientation +                              /* hand orientation */
                                   'st' +                                                 /* grip option */
                                   'st'                                                   /* string option */
                                 }`;

      return shopifyDynamicSKU.toLowerCase().replace(/\./g,'-');
    }

    const shopifySKU = buildDynamicSKU();
    // console.log('shopifySKU: ', shopifySKU)
    this.findBowShopifyAddToCart(shopifySKU);
  }

  async findBowShopifyAddToCart(shopifySKU) {

    // object to add variant item to cart....add to line items
    const bowFromShopify = await fetchShopifyData(getProductByHandle, shopifySKU);

    if (bowFromShopify.data.productByHandle !== null) {

      // check if bow is availableForSale after found
      if (bowFromShopify.data.productByHandle.availableForSale) {

        // array that will hold bow and accessory objects
        let lineItems = this.props.cart.lineItems.map( (line_item) => {
          let variantObject = {
            variantId: line_item.variant.id,
            quantity: line_item.quantity,
            customAttributes: line_item.customAttributes
          }
         return variantObject
        })
    
        // returned from shopify and converted for add to cart
        const variantId = bowFromShopify.data.productByHandle.variants.edges[0].node.id;
        const bowVariantObject = {variantId, quantity: parseInt(1, 10), customAttributes: [{'key': 'Ship To Dealer Address', 'value': `${this.props.selectedDealer.dealerName + '\n' + this.props.selectedDealer.dealerAddress + '\n' + this.props.selectedDealer.dealerCity + ', ' + this.props.selectedDealer.dealerState + " " + this.props.selectedDealer.dealerZip + '\n' + this.props.selectedDealer.dealerPhone}`}]}
        lineItems.push(bowVariantObject);

        const bowAccessories = this.props.customerConfiguredBowModel.accessories;

        // add accessories too lineItems array
        for (const accessoryTypeArray of Object.keys(bowAccessories)) {
          if(bowAccessories[accessoryTypeArray].length > 0) {
            bowAccessories[accessoryTypeArray].forEach((accessoryItem) => {
              // check if item is already in cart/checkout lineItems array
              const foundItem = lineItems.find(item => item.variantId === accessoryItem.node.id)
              if (foundItem) {
                foundItem.quantity = foundItem.quantity + 1
              } else {
                const item = {variantId: accessoryItem.node.id, quantity: parseInt(1, 10)}
                lineItems.push(item);
              }
            });
          }
        }

        // console.log('lineItems: ', lineItems)
        if(this.props.cart.id === "") {
          this.props.createCart(lineItems)
        } else {
          this.props.replaceCartLineItems(this.props.cart.id, lineItems)
        }

        this.setState({ go: true })

      } else {
        this.setState({ assistanceFormActive: true })
      }

    } else {
      // alert('I cannot find the bow you would like to purchase.')
      this.setState({ assistanceFormActive: true })
    }
  }

  handleAssistanceFormClose(event) {
    event.preventDefault();
    const formInputs = document.querySelectorAll('#customer-assistance-form input');
    const textField = document.querySelector('#customer-assistance-form textarea');

    formInputs.forEach(input => {
      input.value = '';
    });

    textField.value = '';
    this.setState({ assistanceFormActive: false })
  }

  handleSelectDealerReset() {
    const noDealer = {
      dealerName: "N/A",
      dealerAddress: "N/A",
      dealerPhone: "N/A",
      dealerEmail: "N/A"
    };
    this.props.selectDealer(noDealer);
    this.setState({showContinueToCart: false})
  }

  render() {

    // console.log('this.props in AddToCart: ', this.props);

    const redirectToCart = () => {
      if (this.state.go) {
        return <Redirect to="/cart" component={Cart} />
      }
    }

    const styleAddToCart = {
      margin: '1rem'
    }
    return (
      <div id="add-to-cart-wrapper">
        {this.state.showContinueToCart ?
            <ContinueToCart
              selectedDealer={this.props.selectedDealer}
              addBowToCart={this.addBowToCart}
              handleSelectDealerReset={this.handleSelectDealerReset}
            />
          :
            <SelectDealer addBow={this.addBowToCart} fifthSection={this.props.fifthSection}/>
        }
        { redirectToCart() }
        {this.state.assistanceFormActive ?
          <AssistanceForm
            handleAssistanceFormClose={this.handleAssistanceFormClose}
            customerConfiguredBow={this.props.customerConfiguredBowModel}
          />
        : null}
      </div>
    )
  }

}

const mapStateToProps = ({ customerConfiguredBowModel, selectedDealer, shopify }) => ({
  customerConfiguredBowModel,
  selectedDealer,
  cart: shopify.cart
});

export default connect( mapStateToProps, { 
  selectDealer: selectDealerAction,
  replaceCartLineItems: replaceCartLineItemsAction,
  createCart: createCartAction
} )(AddToCart);
