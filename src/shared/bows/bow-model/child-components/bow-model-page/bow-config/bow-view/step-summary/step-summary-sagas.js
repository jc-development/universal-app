import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  STEP_SUMMARY_REQUESTED,
  STEP_SUMMARY_SUCCEEDED,
  STEP_SUMMARY_FAILED,

  FETCH_STEP_SUMMARY_REQUESTED,
  FETCH_STEP_SUMMARY_SUCCEEDED,
  FETCH_STEP_SUMMARY_FAILED
} from './step-summary-actions';

export function* setStepSummary(action) {
  const stepSummary = action.payload;

  try {
    yield put({
      type: STEP_SUMMARY_SUCCEEDED,
      payload: stepSummary
    })
  } catch (error) {
    yield put({
      type: STEP_SUMMARY_FAILED,
      payload: error
    })
  }
}

export function* setStepSummarySaga() {
  yield takeLatest(STEP_SUMMARY_REQUESTED, setStepSummary);
}


const getStepSummary = (state) => state;

export function* fetchStepSummary() {

  const stepSummary = yield select(getStepSummary);
  // console.log('STEP SUMMARY IN SAGA FOR FETCH::::: ', stepSummary);

  yield put({
    type: FETCH_STEP_SUMMARY_SUCCEEDED,
    payload: stepSummary
  })
}

export function* fetchStepSummarySaga() {
  yield takeLatest(FETCH_STEP_SUMMARY_REQUESTED, fetchStepSummary);
}
