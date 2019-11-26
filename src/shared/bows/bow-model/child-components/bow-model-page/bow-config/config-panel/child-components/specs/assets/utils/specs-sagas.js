import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SET_LENGTH_REQUESTED,
  SET_LENGTH_SUCCEEDED,
  SET_LENGTH_FAILED,

  SET_WEIGHT_REQUESTED,
  SET_WEIGHT_SUCCEEDED,
  SET_WEIGHT_FAILED,

  SET_HAND_REQUESTED,
  SET_HAND_SUCCEEDED,
  SET_HAND_FAILED
} from './specs-actions';

export function* setLength(action) {
  const length = action.payload;

  try {
    yield put({
      type: SET_LENGTH_SUCCEEDED,
      payload: length
    });
  } catch (error) {
    yield put({
      type: SET_LENGTH_FAILED,
      payload: error
    });
  }

};

export function* setLengthSaga() {
  yield takeLatest(SET_LENGTH_REQUESTED, setLength);
};

export function* setWeight(action) {
  const weight = action.payload;

  try {
    yield put({
      type: SET_WEIGHT_SUCCEEDED,
      payload: weight
    });
  } catch (error) {
    yield put({
      type: SET_WEIGHT_FAILED,
      payload: error
    });
  }

};

export function* setWeightSaga() {
  yield takeLatest(SET_WEIGHT_REQUESTED, setWeight);
};

export function* setHand(action) {
  const hand = action.payload;

  try {
    yield put({
      type: SET_HAND_SUCCEEDED,
      payload: hand
    });
  } catch (error) {
    yield put({
      type: SET_HAND_FAILED,
      payload: error
    });
  }

};

export function* setHandSaga() {
  yield takeLatest(SET_HAND_REQUESTED, setHand);
};
