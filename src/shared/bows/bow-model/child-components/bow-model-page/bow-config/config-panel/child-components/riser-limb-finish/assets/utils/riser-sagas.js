import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  SET_RISER_COLOR_REQUESTED,
  SET_RISER_COLOR_SUCCEEDED,
  SET_RISER_COLOR_FAILED,

  FETCH_RISER_COLOR_REQUESTED,
  FETCH_RISER_COLOR_SUCCEEDED,
  FETCH_RISER_COLOR_FAILED
} from './riser-actions';

export function* setRiserColor(action) {
  const riserColor = action.payload;

  try {
    yield put({
      type: SET_RISER_COLOR_SUCCEEDED,
      payload: riserColor
    });
  } catch (error) {
    yield put({
      type: SET_RISER_COLOR_FAILED,
      payload: error
    });
  }
};

export function* setRiserColorSaga() {
  yield takeLatest(SET_RISER_COLOR_REQUESTED, setRiserColor);
}


const getColor = (state) => state.bowModel.riserColor;

export function* getRiserColor() {
  const riserColor = yield select(getColor);
  console.log('riserColor in saga: ', riserColor);

  try {
   yield put({
      type: FETCH_RISER_COLOR_SUCCEEDED,
      payload: riserColor
    });
  } catch (error) {
    yield put({
      type: FETCH_RISER_COLOR_FAILED,
      payload: error
    });
  }
}

export function* fetchRiserColorSaga() {
  yield takeLatest(FETCH_RISER_COLOR_REQUESTED, getRiserColor)
}
