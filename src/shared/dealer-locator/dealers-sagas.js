import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  FETCH_DEALERS_REQUESTED,
  FETCH_DEALERS_SUCCEEDED,
  FETCH_DEALERS_FAILED
} from './actions';


export const fetchDealersApi = () => fetch('https://locator.togllc.com/dealers/get?dealer=elite_arch', {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}).then((response) => {
  if (!response.ok) {
    throw new Error();
  }

  return response.json();
})

export function* fetchDealers() {
  // console.log('fetchDealers init');

  try {
    const dealers = yield call(fetchDealersApi);

    // console.log('dealers: ', dealers);

    yield put({
      type: FETCH_DEALERS_SUCCEEDED,
      payload: {
        dealers: dealers
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_DEALERS_FAILED,
      payload: error
    });
  }
};

export function* fetchDealersSaga() {
  yield takeLatest(FETCH_DEALERS_REQUESTED, fetchDealers)
};
