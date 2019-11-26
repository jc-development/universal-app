import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_SLING_REQUESTED,
  SET_SLING_SUCCEEDED,
  SET_SLING_FAILED
} from './sling-actions';

export function* setSling(action) {
  const sling = action.payload;
  // console.log('sling in saga: ', sling);

  try {
    yield put({
      type: SET_SLING_SUCCEEDED,
      payload: sling
    });
  } catch (error) {
    yield put({
      type: SET_SLING_FAILED,
      payload: error
    });
  }
};

export function* setSlingSaga() {
  yield takeLatest(SET_SLING_REQUESTED, setSling);
};
