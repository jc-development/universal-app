import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { fetchShopifyData } from './../../../reusable/shopify/api/fetchShopifyData';
import { getProductRecommendationsQuery } from './graphql/queries';


import {
  FETCH_PRODUCT_RECOMMENDATIONS_REQUESTED,
  FETCH_PRODUCT_RECOMMENDATIONS_SUCCEEDED,
  FETCH_PRODUCT_RECOMMENDATIONS_FAILED,
  CLEAR_PRODUCT_RECOMMENDATIONS_REQUESTED,
  CLEAR_PRODUCT_RECOMMENDATIONS_SUCCEEDED,
  CLEAR_PRODUCT_RECOMMENDATIONS_FAILED,
} from './actions';

//fetch product recommendations using productId that was added to cart
export function* fetchProductRecommendations({productId}) {
  try {
    const productRecommendations = yield call(fetchShopifyData, getProductRecommendationsQuery, productId);
    const recommendedProducts = productRecommendations.data.productRecommendations.slice(0, 4).map( product => {
      let mainCategory
      if (product.tags.includes("Apparel")) {
        mainCategory = "apparel"
      } else if (product.tags.includes("Accessories")) {
        mainCategory = "accessories"
      }

      let notAllowedSubCategories = ["accessories", "apparel", "bow-builder-accessories"]
      let subCategory
      subCategory = product.collections.edges.filter(collection => notAllowedSubCategories.indexOf(collection.node.handle) === -1)
      
      return {
        productId: product.id,
        title: product.title,
        handle: product.handle,
        productType: product.productType,
        mainCategory: mainCategory,
        subCategory: subCategory[0].node.handle,
        image: {
          src: product.images.edges[0].node.src
        }
      }
    })
    yield put({
      type: FETCH_PRODUCT_RECOMMENDATIONS_SUCCEEDED,
      payload: recommendedProducts
    });

  } catch (error) {
    // console.log('error: ', error)
    yield put({
      type: FETCH_PRODUCT_RECOMMENDATIONS_FAILED,
      payload: error
    });
  }
};

export function* fetchProductRecommendationsSaga() {
  yield takeLatest(FETCH_PRODUCT_RECOMMENDATIONS_REQUESTED, fetchProductRecommendations)
};

