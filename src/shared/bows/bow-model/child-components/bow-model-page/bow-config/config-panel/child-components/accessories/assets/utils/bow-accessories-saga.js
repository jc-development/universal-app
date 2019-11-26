import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { getAllBowAccessoriesQuery } from './ShopifyBowAccessoriesQuery';

import {
  FETCH_BOW_ACCESSORIES_REQUESTED,
  FETCH_BOW_ACCESSORIES_SUCCEEDED,
  FETCH_BOW_ACCESSORIES_FAILED,

  DELETE_BOW_ACCESSORY_REQUESTED,
  DELETE_BOW_ACCESSORY_SUCCEEDED,
  DELETE_BOW_ACCESSORY_FAILED,
} from './bow-accessories-actions';

const url = 'https://store.elitearchery.com/api/graphql';

const fetchBowAccessoriesApi = () => fetch(url, {
  method: 'post',
  headers: {
    'X-Shopify-Storefront-Access-Token':'removedForSecurity',
    'Content-Type':'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    query: getAllBowAccessoriesQuery()
  })
}).then( (response) => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
});

export function* fetchBowAccessories() {
  try {
    const responseFromApi = yield call(fetchBowAccessoriesApi);
    const bowAccessories = responseFromApi.data.shop.collectionByHandle.products;

    yield put({
      type: FETCH_BOW_ACCESSORIES_SUCCEEDED,
      payload: {
        bowAccessories: bowAccessories
      }
    })
  } catch (error) {
    yield put({
      type: FETCH_BOW_ACCESSORIES_FAILED,
      payload: error
    });
  }
};

// const getBuild = (state) => {
//   return state.customerConfiguredBowModel
// }

export function* deleteBowAccessory() {
  // const payload = yield select(getBuild);
  // console.log('payload in deleteBowAccessory: ', payload);

  try {
    yield put({
      type: DELETE_BOW_ACCESSORY_SUCCEEDED,
      // payload
    })
  } catch (error) {
    yield put({
      type: DELETE_BOW_ACCESSORY_FAILED,
      payload: error
    });
  }
}

export function* fetchBowAccessoriesSaga() {
  yield takeEvery(FETCH_BOW_ACCESSORIES_REQUESTED, fetchBowAccessories);
};

export function* deleteBowAccessorySaga() {
  yield takeEvery(DELETE_BOW_ACCESSORY_REQUESTED, deleteBowAccessory);
};
