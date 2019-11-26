import { call, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { getBowFamilyQuery } from './bow-family-queries';
import {
  FETCH_BOW_FAMILY_REQUESTED,
  FETCH_BOW_FAMILY_SUCCEEDED,
  FETCH_BOW_FAMILY_FAILED,
  CLEAR_BOW_FAMILY_REQUESTED,
  CLEAR_BOW_FAMILY_SUCCEEDED,
  CLEAR_BOW_FAMILY_FAILED
} from './bow-family-actions';


const url = 'https://elite-2019-bow-family-api.herokuapp.com/'

export const fetchBowFamilyAPI = (bowFamilyName = 'Ritual') => fetch(url, {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: getBowFamilyQuery(bowFamilyName)
  })
}).then( response => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
});

export function* fetchBowFamily(action) {
  const bowFamilyName = action.payload;
  try {
    const responseFromApi = yield call(fetchBowFamilyAPI, bowFamilyName);
    // console.log('responseFromApi.data: ', responseFromApi.data);
    const bowFamily = responseFromApi.data;
    yield put({
      type: FETCH_BOW_FAMILY_SUCCEEDED,
      payload: bowFamily
    });
  } catch (error) {
    yield put({
      type: FETCH_BOW_FAMILY_FAILED,
      payload: {
        bowFamily: { error }
      }
    });
  }
}

export function* clearBowFamily() {
  try {
    yield put({
      type: CLEAR_BOW_FAMILY_SUCCEEDED,
      payload: {
        bowFamily: {
          bows : []
        }
      }
    });
  } catch (error) {
    yield put({
      type: CLEAR_BOW_FAMILY_FAILED,
      payload: {
        bowFamily: {}
      }
    });
  }
}

export function* fetchBowFamilySaga() {
  yield takeLatest(FETCH_BOW_FAMILY_REQUESTED, fetchBowFamily);
};

export function* clearBowFamilySaga() {
  yield takeLatest(CLEAR_BOW_FAMILY_REQUESTED, clearBowFamily);
};
