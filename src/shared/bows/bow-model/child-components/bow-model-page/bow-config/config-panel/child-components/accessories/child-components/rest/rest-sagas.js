import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_REST_REQUESTED,
  SET_REST_SUCCEEDED,
  SET_REST_FAILED
} from './rest-actions';

export function* setRest(action) {
  const rest = action.payload;
  // console.log('rest in saga: ', rest);

  try {
    yield put({
      type: SET_REST_SUCCEEDED,
      payload: rest
    });
  } catch (error) {
    yield put({
      type: SET_REST_FAILED,
      payload: error
    });
  }
};

export function* setRestSaga() {
  yield takeLatest(SET_REST_REQUESTED, setRest);
};
