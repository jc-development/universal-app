import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  SELECT_DEALER_REQUESTED,
  SELECT_DEALER_SUCCEEDED,
  SELECT_DEALER_FAILED
} from './actions';

export function* selectDealer(action) {
  const selectedDealer = action.payload;
  try {
    yield put({
      type: SELECT_DEALER_SUCCEEDED,
      payload: selectedDealer
    });
  } catch (error) {
    yield put({
      type: SELECT_DEALER_FAILED,
      payload: error
    });
  }
};

export function* selectDealerSaga() {
  yield takeLatest(SELECT_DEALER_REQUESTED, selectDealer);
};
