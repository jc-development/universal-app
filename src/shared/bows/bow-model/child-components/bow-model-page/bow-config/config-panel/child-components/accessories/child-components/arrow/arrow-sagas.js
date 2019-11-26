import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_ARROW_REQUESTED,
  SET_ARROW_SUCCEEDED,
  SET_ARROW_FAILED
} from './arrow-actions';

export function* setArrow(action) {
  const arrow = action.payload;
  // console.log('arrow in saga: ', arrow);

  try {
    yield put({
      type: SET_ARROW_SUCCEEDED,
      payload: arrow
    });
  } catch (error) {
    yield put({
      type: SET_ARROW_FAILED,
      payload: error
    });
  }
};

export function* setArrowSaga() {
  yield takeLatest(SET_ARROW_REQUESTED, setArrow);
};
