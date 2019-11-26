import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_BOWCASE_REQUESTED,
  SET_BOWCASE_SUCCEEDED,
  SET_BOWCASE_FAILED
} from './bowcase-actions';

export function* setBowCase(action) {
  const bowcase = action.payload;
  // console.log('BOWCASE in saga: ', bowcase);

  try {
    yield put({
      type: SET_BOWCASE_SUCCEEDED,
      payload: bowcase
    });
  } catch (error) {
    yield put({
      type: SET_BOWCASE_FAILED,
      payload: error
    });
  }
};

export function* setBowCaseSaga() {
  yield takeLatest(SET_BOWCASE_REQUESTED, setBowCase);
};
