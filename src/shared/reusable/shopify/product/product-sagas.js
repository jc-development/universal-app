import { call, put, takeLatest, select } from 'redux-saga/effects';

import { fetchShopifyData } from '../api/fetchShopifyData';

import { getProductByHandle } from './graphql';

import _find from 'lodash/find';
import _includes from 'lodash/includes';


import {
  GET_PRODUCT_BY_HANDLE_REQUESTED,
  GET_PRODUCT_BY_HANDLE_SUCCEEDED,
  GET_PRODUCT_BY_HANDLE_FAILED,
  CLEAR_PRODUCT_REQUESTED,
  CLEAR_PRODUCT_SUCCEEDED,
  CLEAR_PRODUCT_FAILED,
  // SET_STORE_PRODUCT_BY_HANDLE_REQUESTED,
  // SET_STORE_PRODUCT_BY_HANDLE_SUCCEEDED,
  // SET_STORE_PRODUCT_BY_HANDLE_FAILED,
  // SET_STORE_FEATURED_PRODUCT_BY_HANDLE_REQUESTED,
  // SET_STORE_FEATURED_PRODUCT_BY_HANDLE_SUCCEEDED,
  // SET_STORE_FEATURED_PRODUCT_BY_HANDLE_FAILED,
} from './actions';

//fetch store product with products using product handle from shopify
export function* fetchProductByHandle({productHandle}) {
  try {

    const checkReduxCollectionsForProduct = state => state.shopify.collection.list
    const collectionList = yield select(checkReduxCollectionsForProduct)
    const collection = collectionList.find(collection => collection.products.some(product => product.handle === productHandle))
    const match = collection ? collection.products.find(product => product.handle === productHandle) : undefined
    
    if (match) {

      yield put({
        type: GET_PRODUCT_BY_HANDLE_SUCCEEDED,
        payload: match
      });

    } else {

      const product = yield call(fetchShopifyData, getProductByHandle, productHandle);
      const productData = product.data.productByHandle
  
      if (productData === null ) {
        yield put({
          type: GET_PRODUCT_BY_HANDLE_FAILED,
          payload: {}
        });
      } else {
  
        const productObject = {
          id: productData.id,
          handle: productData.handle,
          title: productData.title,
          tags: productData.tags,
          availableForSale: productData.availableForSale,
          description: productData.description,
          descriptionHtml: productData.descriptionHtml,
          priceRange: {
            minVariantPrice: productData.priceRange.minVariantPrice.amount,
            maxVariantPrice: productData.priceRange.minVariantPrice.amount
          },
          images: productData.images.edges.length > 0 ? productData.images.edges.map(image => { return image.node }) : [],
          options: productData.options,
          variants: productData.variants.edges.length > 0 ? productData.variants.edges.map(variant => { 
            return {
              id: variant.node.id,
              title: variant.node.title,
              sku: variant.node.sku,
              availableForSale: variant.node.availableForSale,
              price: variant.node.priceV2.amount,
              compareAtPrice: variant.node.compareAtPriceV2 !== null ? variant.node.compareAtPriceV2.amount : null,
              image: variant.node.image,
              selectedOptions: variant.node.selectedOptions
            }
          }) : [],
        }
  
        // console.log('product info from Shopify: ', productObject)
  
        yield put({
          type: GET_PRODUCT_BY_HANDLE_SUCCEEDED,
          payload: productObject
        });
      }
      
    }


  } catch (error) {
    console.log('error: ', error)
    yield put({
      type: GET_PRODUCT_BY_HANDLE_FAILED,
      payload: error
    });
  }
};

export function* fetchProductByHandleSaga() {
  yield takeLatest(GET_PRODUCT_BY_HANDLE_REQUESTED, fetchProductByHandle)
};

export function* clearProduct() {
  try {
    yield put({
      type: CLEAR_PRODUCT_SUCCEEDED,
      payload: {}
    });
  } catch (error) {
    yield put({
      type: CLEAR_PRODUCT_FAILED,
      payload: {}
    });
  }
};

export function* clearProductSaga() {
  yield takeLatest(CLEAR_PRODUCT_REQUESTED, clearProduct);
}

// //find store product using product handle from local redux state
// export function* findStoreProductByHandle({collectionProductType, collectionHandle, productHandle}) {
//   try {

//     let getReduxStoreCollections
//     if (collectionProductType === 'accessories') {
//       getReduxStoreCollections = state => state.store.accessories
//     } else if (collectionProductType === 'apparel') {
//       getReduxStoreCollections = state => state.store.apparel
//     }
//     const collections = yield select(getReduxStoreCollections)
//     const collectionMatch = _find(collections, (collection) => {
//       return collection.node.handle === collectionHandle
//     });
//     // console.log('collectionMatch: ', collectionMatch)
//     const collectionMatchProducts = collectionMatch.node.products.edges;
//     const productMatch = _find(collectionMatchProducts, (product) => {
//       return product.node.handle === productHandle
//     })

//     // console.log('productMatch: ', productMatch)

//     if (productMatch === undefined) {
//       yield put({
//         type: SET_STORE_PRODUCT_BY_HANDLE_FAILED,
//         payload: {}
//       });
//     } else {
//       yield put({
//         type: SET_STORE_PRODUCT_BY_HANDLE_SUCCEEDED,
//         payload: productMatch.node
//       });
//     }

//   } catch (error) {
//     // console.log('error: ', error)
//     yield put({
//       type: SET_STORE_PRODUCT_BY_HANDLE_FAILED,
//       payload: error
//     });
//   }
// };

// export function* findStoreProductByHandleSaga() {
//   yield takeLatest(SET_STORE_PRODUCT_BY_HANDLE_REQUESTED, findStoreProductByHandle)
// };

// //find store product using product handle from local redux state
// export function* findStoreFeaturedProductByHandle({collectionHandle, productHandle}) {
//   try {

//     let getReduxStoreCollections
//     if (collectionHandle === 'featured-accessories') {
//       getReduxStoreCollections = state => state.store.featuredAccessories
//     } else if (collectionHandle === 'featured-apparel') {
//       getReduxStoreCollections = state => state.store.featuredApparel
//     }
//     const collection = yield select(getReduxStoreCollections)
//     const collectionMatchProducts = collection.products.edges;
//     const productMatch = _find(collectionMatchProducts, (product) => {
//       return product.node.handle === productHandle
//     })

//     if (productMatch === undefined) {
//       yield put({
//         type: SET_STORE_FEATURED_PRODUCT_BY_HANDLE_FAILED,
//         payload: {}
//       });
//     } else {
//       yield put({
//         type: SET_STORE_FEATURED_PRODUCT_BY_HANDLE_SUCCEEDED,
//         payload: productMatch.node
//       });
//     }

//   } catch (error) {
//     // console.log('error: ', error)
//     yield put({
//       type: SET_STORE_FEATURED_PRODUCT_BY_HANDLE_FAILED,
//       payload: error
//     });
//   }
// };

// export function* findStoreFeaturedProductByHandleSaga() {
//   yield takeLatest(SET_STORE_FEATURED_PRODUCT_BY_HANDLE_REQUESTED, findStoreFeaturedProductByHandle)
// };
