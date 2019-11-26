import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_STABILIZER_REQUESTED,
  SET_STABILIZER_SUCCEEDED,
  SET_STABILIZER_FAILED
} from './stabilizer-actions';

export function* setStabilizer(action) {
  const stabilizer = action.payload;
  // console.log('stabilizer in saga: ', stabilizer);

  try {
    yield put({
      type: SET_STABILIZER_SUCCEEDED,
      payload: stabilizer
    });
  } catch (error) {
    yield put({
      type: SET_STABILIZER_FAILED,
      payload: error
    });
  }
};

export function* setStabilizerSaga() {
  yield takeLatest(SET_STABILIZER_REQUESTED, setStabilizer);
};
