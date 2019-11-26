import React, { Component } from 'react';
import _reduce from 'lodash/reduce';
import _find from 'lodash/find';

import { ProductPage } from './child-components/ProductPage';
import { ProductPageMobile } from './child-components/ProductPageMobile';

import TweenMax from 'gsap/TweenMax';
import scrollTo from 'gsap/ScrollToPlugin';
import AddToCartModal from './../../add-to-cart-modal/AddToCartModal'

import { connect } from 'react-redux';
import {
  getProductByHandle as getProductByHandleAction,
  clearProduct as clearProductAction,
} from '../../reusable/shopify/product/actions';

import { 
  replaceCartLineItems as replaceCartLineItemsAction,
  createCart as createCartAction
} from './../../reusable/shopify/cart/actions';

import MonthlyPayment from './../../klarna/MonthlyPayment';

import './assets/css/store-product.css';

import StoreMenu from './../store-index/child-components/StoreMenu';

class StoreProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: this.props.product,
      selectedVariant: this.props.product.variants[0],
      selectedVariantImage: this.props.product.images[0].transformedSrc,
      selectedVariantQuantity: 1,
      selectedOptions: this.props.product.variants[0].selectedOptions[0],
      isMobile: false,
      mobileImginView: 1,
      selectedVariantImageShow: false
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleInitialSelectedOptions = this.handleInitialSelectedOptions.bind(this);
    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
    this.mobileThumbsArrowScrollLeft = this.mobileThumbsArrowScrollLeft.bind(this);
    this.mobileThumbsArrowScrollRight = this.mobileThumbsArrowScrollRight.bind(this);
    this.handleInitialScrollOnMobile = this.handleInitialScrollOnMobile.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleCloseVariantShow = this.handleCloseVariantShow.bind(this);

  }

  componentWillMount() {
    let productHandle = this.props.match.params.product;
    this.props.getProductByHandle(productHandle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.title === "") {
      this.props.history.replace('/store')
    } else if(this.props.product !== nextProps.product) {
      this.setState({product: nextProps.product}, () => {
        this.handleInitialSelectedOptions()
      })
    }
    if (this.props.location.pathname !== nextProps.location.pathname) {
      let productHandle = nextProps.match.params.product;
      this.props.getProductByHandle(productHandle);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize()
  }

  handleInitialSelectedOptions() {
    // this will hold selected variant
    let selectedVariant

    // if product variant on sale and has inventory
    const variantOnSale = _find(this.state.product.variants, (variant) => { return variant.compareAtPrice !== null && variant.availableForSale === true })
    // console.log('variantOnSale: ', variantOnSale)

    // if product variant has inventory
    const variantWithInventory = _find(this.state.product.variants, (variant) => { return variant.availableForSale === true })
    // console.log('variantWithInventory: ', variantWithInventory)

    // get the the first variant
    const variantWithNoInventory = _find(this.state.product.variants, (variant) => { return variant })
    // console.log('variantWithNoInventory: ', variantWithNoInventory)

    // sets the initially selected variant based on conditions above if they resolve true.
    if (variantOnSale) {
      selectedVariant = variantOnSale
    } else if (variantWithInventory) {
      selectedVariant = variantWithInventory
    } else {
      selectedVariant = variantWithNoInventory
    }
    // console.log('selectedVariant: ', selectedVariant)

    // extract the key value pair and make new object with { name: value }
    const selectedVariantOptions = selectedVariant.selectedOptions.map((selector) => {
      return {
        [selector.name]:
        selector.value
      }
    })
    // console.log('selectedVariantOptions: ', selectedVariantOptions)


    const selectedOptions = _reduce(selectedVariantOptions, function(result, object) {
      let key = Object.keys(object)[0];
      result[key] = object[key]
      return result
    })
    // console.log('selectedOptions: ', selectedOptions)

    this.setState({
      selectedOptions: selectedOptions,
      selectedVariant: selectedVariant
    });

    if (selectedVariant.image !== null) {
      this.setState({selectedVariantImage: selectedVariant.image.transformedSrc}, () => {
        if(this.state.isMobile) {
          this.handleInitialScrollOnMobile(selectedVariant.image.id)
        }
      });
    } else {
      this.setState({selectedVariantImage:this.state.product.images[0].transformedSrc })
    }

  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    // console.log("options: ", selectedOptions)
    // product thumb image uses function if has data-variant-id
    if (target.getAttribute('data-variant-id') !== null) {
      const variantID = target.getAttribute('data-variant-id')
      let variantObject = this.state.product.variants.find((variant) => {
        if(variant.image !== null) {
          return variant.image.id === variantID
        }
      });
      if (variantObject !== undefined) {
        if (variantObject.image !== null) {
          this.setState({
            selectedVariant: variantObject,
            selectedVariantImage: variantObject.image.transformedSrc,
            selectedVariantImageShow: true
          });
        } else {
          this.setState({selectedVariant: variantObject});
        }
        variantObject.selectedOptions.every((selectedOption, i) => {
          return selectedOptions[selectedOption.name] = selectedOption.value;
        });
      } else {
        this.setState({
          selectedVariantImage: target.src,
          selectedVariantImageShow: true
        });
      }
    }
    else {
      selectedOptions[target.name] = target.value;

      const selectedVariant = this.state.product.variants.find((variant) => {
        return variant.selectedOptions.every((selectedOption) => {
          return selectedOptions[selectedOption.name] === selectedOption.value;
        });
      });

      if (selectedVariant.image !== null) {
        if(target.name === "Color" && this.state.selectedVariantImage !== selectedVariant.image.transformedSrc) {
          this.setState({
            selectedVariant: selectedVariant,
            selectedVariantImage: selectedVariant.image.transformedSrc,
            selectedVariantImageShow: true
          });
        } else {
          this.setState({
            selectedVariant: selectedVariant,
            selectedVariantImage: selectedVariant.image.transformedSrc,
          });
        }
        if(this.state.isMobile) {this.handleInitialScrollOnMobile(selectedVariant.image.id)}
      } else {
        this.setState({selectedVariant: selectedVariant});
      }
    }
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  handleAddProductToCart(variantId, quantity) {
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
      // console.log('quantity: ', quantity)
      foundItem.quantity = foundItem.quantity + quantity
    } else {
      lineItems.push({variantId, quantity: parseInt(quantity, 10)});
    }

    if(this.props.cart.id === "") {
      this.props.createCart(lineItems)
    } else { 
      this.props.replaceCartLineItems(this.props.cart.id, lineItems)
    }
    TweenMax.to(".hidden-modal", 0, {display: "block"})
  }

  componentWillUnmount() {
    this.props.clearProduct();
    window.removeEventListener('resize', this.handleResize);
  }

  mobileThumbsArrowScrollLeft() {
    const scrollNodes = this.thumbsWrapper.childNodes.length - 1
    const scrollableWidth = this.thumbsWrapper.scrollWidth;
    const viewableWidth = this.thumbsWrapper.getBoundingClientRect().width;
    const maxScroll = scrollableWidth - Math.round(viewableWidth);
    const currentScrollPosition = this.thumbsWrapper.scrollLeft;
    if(this.state.mobileImginView > 1) {
      const count = this.state.mobileImginView - 1
      this.setState({mobileImginView:count}, () => {
        if(this.state.isMobile) {
          const childIndex = this.state.mobileImginView - 1
          const event = {
            target: this.thumbsWrapper.childNodes[childIndex].childNodes[0]
          }
          if(this.thumbsWrapper.childNodes[childIndex].childNodes[0].dataset.variantId) {
            this.handleOptionChange(event)
          }
        }
      })
      TweenMax.to(this.thumbsWrapper, 0.5, {scrollTo:{x: currentScrollPosition - (maxScroll/scrollNodes)}})
    } else {
      this.setState({mobileImginView:scrollNodes + 1}, () => {
        if(this.state.isMobile) {
          const childIndex = this.state.mobileImginView - 1
          const event = {
            target: this.thumbsWrapper.childNodes[childIndex].childNodes[0]
          }
          if(this.thumbsWrapper.childNodes[childIndex].childNodes[0].dataset.variantId) {
            this.handleOptionChange(event)
          }
        }
      })
      TweenMax.to(this.thumbsWrapper, 0.5, {scrollTo:{x: maxScroll}})
    }
  }

  mobileThumbsArrowScrollRight() {
    const scrollNodes = this.thumbsWrapper.childNodes.length - 1
    const scrollableWidth = this.thumbsWrapper.scrollWidth;
    const viewableWidth = this.thumbsWrapper.getBoundingClientRect().width;
    const maxScroll = scrollableWidth - Math.round(viewableWidth);
    const currentScrollPosition = this.thumbsWrapper.scrollLeft;
    if(this.state.mobileImginView <= scrollNodes) {
      const count = this.state.mobileImginView + 1
      this.setState({mobileImginView:count}, () => {
        if(this.state.isMobile) {
          const childIndex = this.state.mobileImginView - 1
          const event = {
            target: this.thumbsWrapper.childNodes[childIndex].childNodes[0]
          }
          if(this.thumbsWrapper.childNodes[childIndex].childNodes[0].dataset.variantId) {
            this.handleOptionChange(event)
          }
        }
      })
      TweenMax.to(this.thumbsWrapper, 0.5, {scrollTo:{x: currentScrollPosition + (maxScroll/scrollNodes)}})
     
    } else {
      this.setState({mobileImginView:1}, () => {
        if(this.state.isMobile) {
          const childIndex = this.state.mobileImginView - 1
          const event = {
            target: this.thumbsWrapper.childNodes[childIndex].childNodes[0]
          }
          if(this.thumbsWrapper.childNodes[childIndex].childNodes[0].dataset.variantId) {
            this.handleOptionChange(event)
          }
        }
      })
      TweenMax.to(this.thumbsWrapper, 0.5, {scrollTo:{x: 0}})
    }
  }

  handleInitialScrollOnMobile(selectedVariantId) {
    const scrollNodes = this.thumbsWrapper.childNodes.length - 1
    const scrollableWidth = this.thumbsWrapper.scrollWidth;
    const viewableWidth = this.thumbsWrapper.getBoundingClientRect().width;
    const maxScroll = scrollableWidth - Math.round(viewableWidth);
    const individualScroll = maxScroll/scrollNodes;
    let imageIndex
    this.thumbsWrapper.childNodes.forEach((child, i) => {
      if(selectedVariantId === child.childNodes[0].dataset.variantId) {
        imageIndex = i
      }
    })
    if(imageIndex !== undefined) {
      this.setState({mobileImginView:imageIndex+1})
      TweenMax.to(this.thumbsWrapper, 0.5, {scrollTo:{x: individualScroll*(imageIndex)}})
    }
  }

  handleResize() {
    if (window.innerWidth <= 1023) {
      this.setState({isMobile: true})
    } else {
      this.setState({isMobile: false})
    }
  }

  handleCloseVariantShow() {
    this.setState({selectedVariantImageShow: false})
  }

  render() {
    // console.log('this.props: ', this.props)
    const variantOptions = Object.values(this.state.selectedOptions)
    // console.log('variantOptions: ', variantOptions)

    const klarnaReady = () => {
      if (this.state.selectedVariant.price !== null && this.state.selectedVariant.price > 299) {
        const klarnaPriceFormat = this.state.selectedVariant.price * 100
        // console.log('variant-price: ', klarnaPriceFormat)
        return (
          <div className="klarna-heading-wrapper">
           <MonthlyPayment id="product-klarna-price" amount={`${klarnaPriceFormat}`} />
          </div>
        )
      }
    }

    const getSomething = () => {
        if (this.state.product.id) {
          return (<div>
            <StoreMenu />
            {this.state.isMobile ? 
              <ProductPageMobile
                routerParams={this.props.match.params}
                product={this.state.product}
                variant={this.state.selectedVariant}
                variantImage={this.state.selectedVariantImage}
                variantQuantity={this.state.selectedVariantQuantity}
                handleQuantityChange={this.handleQuantityChange}
                handleOptionChange={this.handleOptionChange}
                handleAddProductToCart={this.handleAddProductToCart}
                variantOptions={variantOptions}
                klarna={klarnaReady()}
                scrollLeft={this.mobileThumbsArrowScrollLeft}
                scrollRight={this.mobileThumbsArrowScrollRight}
                refThumbsWrapper={thumbsWrapper => this.thumbsWrapper = thumbsWrapper}
                mobileImginView={this.state.mobileImginView}
              />
            :
              <ProductPage
              routerParams={this.props.match.params}
              product={this.state.product}
              variant={this.state.selectedVariant}
              variantImage={this.state.selectedVariantImage}
              variantQuantity={this.state.selectedVariantQuantity}
              handleQuantityChange={this.handleQuantityChange}
              handleOptionChange={this.handleOptionChange}
              handleAddProductToCart={this.handleAddProductToCart}
              variantOptions={variantOptions}
              klarna={klarnaReady()}
              scrollLeft={this.mobileThumbsArrowScrollLeft}
              scrollRight={this.mobileThumbsArrowScrollRight}
              refThumbsWrapper={thumbsWrapper => this.thumbsWrapper = thumbsWrapper}
              selectedVariantImageShow={this.state.selectedVariantImageShow}
              closeSelectedVariantImage={this.handleCloseVariantShow}
            />
            }
            <AddToCartModal
              productTitle={this.state.product.title}
              productImage={this.state.selectedVariantImage}
              productId={this.state.product.id}
            />
          </div>);
        } else {
          return (<h1>Loading</h1>);
        }
      }
      return ( getSomething() );
    }

}

const mapStateToProps = ({ shopify, selectedDealer, store }) => {
  return {
    product: shopify.product,
    cart: shopify.cart,
    selectedDealer,
  };
};

export default connect(mapStateToProps, {
    getProductByHandle: getProductByHandleAction,
    clearProduct: clearProductAction,
    replaceCartLineItems: replaceCartLineItemsAction,
    createCart: createCartAction
  })(StoreProduct)
