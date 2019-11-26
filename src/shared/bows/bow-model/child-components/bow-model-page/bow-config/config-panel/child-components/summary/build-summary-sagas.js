import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  FETCH_BUILD_SUMMARY_REQUESTED,
  FETCH_BUILD_SUMMARY_SUCCEEDED,
  FETCH_BUILD_SUMMARY_FAILED,
} from './build-summary-actions';

const getBuild = (state) => {
  // console.log('state in saga: ', state.customerConfiguredBowModel.accessories);
  return state.customerConfiguredBowModel.accessories;
};

export function* getBuildSummary() {

  const buildSummary = yield select(getBuild);
  // console.log('buildSummary in saga: ', buildSummary);
  
  try {
    yield put({
      type: FETCH_BUILD_SUMMARY_SUCCEEDED,
      payload: buildSummary
    });
  } catch (error) {
    yield put({
      type: FETCH_BUILD_SUMMARY_FAILED,
      payload: error
    });
  }
}

export function* fetchBuildSummarySaga() {
  yield takeLatest(FETCH_BUILD_SUMMARY_REQUESTED, getBuildSummary);
}
