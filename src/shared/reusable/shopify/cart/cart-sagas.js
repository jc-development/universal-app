import { call, take, fork, put, select, takeLatest } from 'redux-saga/effects';

import { fetchShopifyData } from '../api/fetchShopifyData';

import { createCart, replaceCartLineItems, applyDiscountCode, removeDiscountCode } from './graphql';

import {
  CREATE_CART_REQUESTED,
  CREATE_CART_SUCCEEDED,
  CREATE_CART_FAILED,
  REPLACE_CART_LINE_ITEMS_REQUESTED,
  REPLACE_CART_LINE_ITEMS_SUCCEEDED,
  REPLACE_CART_LINE_ITEMS_FAILED,
  APPLY_DISCOUNT_CODE_REQUESTED,
  APPLY_DISCOUNT_CODE_SUCCEEDED,
  APPLY_DISCOUNT_CODE_FAILED,
  REMOVE_DISCOUNT_CODE_REQUESTED,
  REMOVE_DISCOUNT_CODE_SUCCEEDED,
  REMOVE_DISCOUNT_CODE_FAILED,
  OPTIMISTIC_CART_UPDATE_REQUESTED,
  OPTIMISTIC_CART_UPDATE_SUCCEEDED,
  OPTIMISTIC_CART_UPDATE_FAILED,
  REMOVE_DISCOUNT_CODE_ERROR_REQUESTED,
  REMOVE_DISCOUNT_CODE_ERROR_SUCCEEDED,
  REMOVE_DISCOUNT_CODE_ERROR_FAILED,
} from './actions';
 
const takeLeading = (patternOrChannel, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
})

export function* fetchCreateCart({lineItems}) {
  try {
    const cart = yield call(fetchShopifyData, createCart, lineItems);
    if (cart.errors) { 
      console.log('cart errors: ', cart.errors) // query level error
      yield put({
        type: CREATE_CART_FAILED,
        payload: cart.errors
      });
    } else { 

      const cartData = cart.data.checkoutCreate

      if (cartData.checkoutUserErrors.length > 0) {
        console.log('cart checkoutUserErrors: ', cartData.checkoutUserErrors) // user level error
        yield put({
          type: CREATE_CART_FAILED,
          payload: cartData.checkoutUserErrors
        });
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
        // console.log('cartObject create: ', cartObject)
        yield put({
          type: CREATE_CART_SUCCEEDED,
          payload: cartObject
        });
      }
      
    }

  } catch (error) { 
    console.log('error: ', error) // standard errors - network, variable definitions, etc...
    yield put({
      type: CREATE_CART_FAILED,
      payload: error
    });
  }
};

export function* fetchCreateCartSaga() {
  yield takeLeading(CREATE_CART_REQUESTED, fetchCreateCart)
};

export function* fetchReplaceCartLineItems({checkoutId, lineItems}) {
  const addLineItems = {checkoutId, lineItems};

  try {
    const cart = yield call(fetchShopifyData, replaceCartLineItems, addLineItems);

    if (cart.errors) { 
      console.log('cart errors: ', cart.errors) // query level error
      yield put({
        type: REPLACE_CART_LINE_ITEMS_FAILED,
        payload: cart.errors
      });
    } else { 

      const cartData = cart.data.checkoutLineItemsReplace

      if (cartData.userErrors.length > 0) {
        console.log('cart userErrors: ', cartData.userErrors) // user level error
        yield put({
          type: REPLACE_CART_LINE_ITEMS_FAILED,
          payload: cartData.userErrors
        });
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
        yield put({
          type: REPLACE_CART_LINE_ITEMS_SUCCEEDED,
          payload: cartObject
        });

      }
      
    }

  } catch (error) {
    console.log('error: ', error) // standard errors - network, variable definitions, etc...
    yield put({
      type: REPLACE_CART_LINE_ITEMS_FAILED,
      payload: error
    });
  }
};

export function* fetchReplaceCartLineItemsSaga() {
  yield takeLeading(REPLACE_CART_LINE_ITEMS_REQUESTED, fetchReplaceCartLineItems)
};

export function* fetchApplyDiscountCode({checkoutId, discountCode}) {
  const addLineItems = {checkoutId, discountCode};
  try {
    const cart = yield call(fetchShopifyData, applyDiscountCode, addLineItems);

    if (cart.errors) { 
      console.log('cart errors: ', cart.errors) // query level error
      yield put({
        type: APPLY_DISCOUNT_CODE_FAILED,
        payload: cart.errors
      });
    } else { 

      const cartData = cart.data.checkoutDiscountCodeApplyV2

      if (cartData.checkoutUserErrors.length > 0) {
        console.log('cart checkoutUserErrors: ', cartData.checkoutUserErrors) // user level error
        yield put({
          type: APPLY_DISCOUNT_CODE_FAILED,
          payload: cartData.checkoutUserErrors[0]
        });
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
        // console.log('cartObject apply discount: ', cartObject)
        yield put({
          type: APPLY_DISCOUNT_CODE_SUCCEEDED,
          payload: cartObject
        });
      }
      
    }

  } catch (error) {
    console.log('error: ', error) // standard errors - network, variable definitions, etc...
    yield put({
      type: APPLY_DISCOUNT_CODE_FAILED,
      payload: error
    });
  }
};

export function* fetchApplyDiscountCodeSaga() {
  yield takeLeading(APPLY_DISCOUNT_CODE_REQUESTED, fetchApplyDiscountCode)
};

export function* fetchRemoveDiscountCode({checkoutId}) {
  try {
    const cart = yield call(fetchShopifyData, removeDiscountCode, checkoutId);

    if (cart.errors) { 
      console.log('cart errors: ', cart.errors) // query level error
      yield put({
        type: REMOVE_DISCOUNT_CODE_FAILED,
        payload: cart.errors
      });
    } else { 

      const cartData = cart.data.checkoutDiscountCodeRemove

      if (cartData.checkoutUserErrors.length > 0) {
        console.log('cart checkoutUserErrors: ', cartData.checkoutUserErrors) // user level error
        yield put({
          type: REMOVE_DISCOUNT_CODE_FAILED,
          payload: cartData.checkoutUserErrors
        });
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
        // console.log('cartObject remove discount: ', cartObject)
        yield put({
          type: REMOVE_DISCOUNT_CODE_SUCCEEDED,
          payload: cartObject
        });
      }
      
    }

  } catch (error) { 
    console.log('error: ', error) // standard errors - network, variable definitions, etc...
    yield put({
      type: REMOVE_DISCOUNT_CODE_FAILED,
      payload: error
    });
  }
};

export function* fetchRemoveDiscountCodeSaga() {
  yield takeLeading(REMOVE_DISCOUNT_CODE_REQUESTED, fetchRemoveDiscountCode)
};

export function* optimisticCartUpdate({lineItems}) {
  try {
    const cartRedux = state => state.shopify.cart
    const cart = yield select(cartRedux)
    // update cart lineItems with correct quantity
    const damn = cart.lineItems.filter(reduxLineItem => lineItems.some(passedLineItem => passedLineItem.variantId === reduxLineItem.variant.id ))
    const updatedLineItems = lineItems.length > 0 ? 
      damn.map(reduxLineItem => {
          let temp
          lineItems.forEach(lineItem => {
            if(lineItem.variantId === reduxLineItem.variant.id) {
              let savingsPerQuantity
              if (reduxLineItem.discountAllocations.length > 0) {
                savingsPerQuantity = parseFloat(reduxLineItem.discountAllocations[0].allocatedAmount.amount) / reduxLineItem.quantity
              }
              reduxLineItem.quantity = lineItem.quantity
              if (reduxLineItem.discountAllocations.length > 0) {
                reduxLineItem.discountAllocations[0].allocatedAmount.amount = parseFloat(savingsPerQuantity * reduxLineItem.quantity).toFixed(2)
              }
              temp = reduxLineItem
            }
          });
          return temp
      })
    : lineItems

    // update cart lineItemsSubtotalPrice with correct price
    const updatedlineItemsSubtotalPrice = updatedLineItems.reduce((acc, current) => {
      return (current.quantity * parseFloat(current.variant.priceV2.amount)) + acc
    }, 0.00)

      // update cart subtotalPrice with correct price, also checking for active discounts
    const updatedSubtotalPrice = updatedLineItems.reduce((acc, current) => {
      if (current.discountAllocations.length > 0) {
        return (current.quantity * parseFloat(current.variant.priceV2.amount) - parseFloat(current.discountAllocations[0].allocatedAmount.amount)) + acc
      } else {
        return (current.quantity * parseFloat(current.variant.priceV2.amount)) + acc
      }
    }, 0.00)

    const cartObject = {
      id: cart.id,
      webUrl: cart.webUrl,
      lineItems: updatedLineItems,
      lineItemsSubtotalPrice: updatedlineItemsSubtotalPrice.toFixed(2),
      subtotalPrice: updatedSubtotalPrice.toFixed(2),
      totalPrice: updatedSubtotalPrice.toFixed(2),
      discountApplications: cart.discountApplications,
      checkoutReady: false,
      discountError: cart.discountError
    }

    yield put({
      type: OPTIMISTIC_CART_UPDATE_SUCCEEDED,
      payload: cartObject
    });

  } catch (error) {
    console.log('error: ', error) // standard errors - network, variable definitions, etc...
    yield put({
      type: OPTIMISTIC_CART_UPDATE_FAILED,
      payload: error
    });
  }
}

export function* optimisticCartUpdateSaga() {
  yield takeLatest(OPTIMISTIC_CART_UPDATE_REQUESTED, optimisticCartUpdate)
};

export function* removeDiscountCodeError() {
  try {
    yield put({
      type: REMOVE_DISCOUNT_CODE_ERROR_SUCCEEDED
    });

  } catch (error) { 
    console.log('error: ', error) // standard errors - network, variable definitions, etc...
    yield put({
      type: REMOVE_DISCOUNT_CODE_ERROR_FAILED,
      payload: error
    });
  }
};

export function* removeDiscountCodeErrorSaga() {
  yield takeLeading(REMOVE_DISCOUNT_CODE_ERROR_REQUESTED, removeDiscountCodeError)
};