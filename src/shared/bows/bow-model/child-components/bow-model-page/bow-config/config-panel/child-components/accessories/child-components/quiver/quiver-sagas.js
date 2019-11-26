import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_QUIVER_REQUESTED,
  SET_QUIVER_SUCCEEDED,
  SET_QUIVER_FAILED
} from './quiver-actions';

export function* setQuiver(action) {
  const quiver = action.payload;
  // console.log('quiver in saga: ', quiver);

  try {
    yield put({
      type: SET_QUIVER_SUCCEEDED,
      payload: quiver
    });
  } catch (error) {
    yield put({
      type: SET_QUIVER_FAILED,
      payload: error
    });
  }
};

export function* setQuiverSaga() {
  yield takeLatest(SET_QUIVER_REQUESTED, setQuiver);
};
