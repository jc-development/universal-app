import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_LIMB_COLOR_REQUESTED,
  SET_LIMB_COLOR_SUCCEEDED,
  SET_LIMB_COLOR_FAILED
} from './limb-actions';

export function* setLimbColor(action) {
  const limbColor = action.payload;

  try {
    yield put({
      type: SET_LIMB_COLOR_SUCCEEDED,
      payload: limbColor
    });
  } catch (error) {
    yield put({
      type: SET_LIMB_COLOR_FAILED,
      payload: error
    });
  }
};

export function* setLimbColorSaga() {
  yield takeLatest(SET_LIMB_COLOR_REQUESTED, setLimbColor);
}
