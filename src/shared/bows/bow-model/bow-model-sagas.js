import { call, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { getBowModelQuery } from './../../graphql/queries';

import {
  SET_BOW_MODEL_REQUESTED,
  SET_BOW_MODEL_SUCCEEDED,
  SET_BOW_MODEL_FAILED,
  SET_BOW_SKU_REQUESTED,
  SET_BOW_SKU_SUCCEEDED,
  SET_BOW_SKU_FAILED,
  CLEAR_BOW_MODEL_REQUESTED,
  CLEAR_BOW_MODEL_SUCCEEDED,
  CLEAR_BOW_MODEL_FAILED
} from './bow-model-actions';

export function* setBowModel(action) {
  const bowModel = action.payload;

  try {
    yield put({
      type: SET_BOW_MODEL_SUCCEEDED,
      payload: bowModel
    });
  } catch (error) {
    yield put({
      type: SET_BOW_MODEL_FAILED,
      payload: error
    })
  }
};

export function* setBowSku(action) {
  const bowSku = action.payload;

  try {
    yield put({
      type: SET_BOW_SKU_SUCCEEDED,
      payload: bowSku
    });
  } catch (error) {
    yield put({
      type: SET_BOW_SKU_FAILED,
      payload: error
    });
  }
};

export function* clearBowModel() {
  try {
    yield put({
      type: CLEAR_BOW_MODEL_SUCCEEDED,
      payload: {
        bowModel: {}
      }
    });
  } catch (error) {
    yield put({
      type: CLEAR_BOW_MODEL_FAILED,
      payload: {
        bowModel: {}
      }
    });
  }
}

export function* setBowModelSaga() {
  yield takeLatest(SET_BOW_MODEL_REQUESTED, setBowModel);
};

export function* setBowSkuSaga() {
  yield takeLatest(SET_BOW_SKU_REQUESTED, setBowSku);
};

export function* clearBowModelSaga() {
  yield takeLatest(CLEAR_BOW_MODEL_REQUESTED, clearBowModel);
};
