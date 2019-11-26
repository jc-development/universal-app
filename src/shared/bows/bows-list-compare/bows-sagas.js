import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { getAllBowsQuery } from '../../graphql/queries';

import {
  FETCH_BOWS_REQUESTED,
  FETCH_BOWS_SUCCEEDED,
  FETCH_BOWS_FAILED
} from './actions';


const url = 'https://elite-2019-bow-family-api.herokuapp.com/'

export const fetchBowsApi = () => fetch(url, {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: getAllBowsQuery()
  })
}).then( (response) => {
  if (!response.ok) {
    throw new Error();
  }

  return response.json();
} );

export function* fetchBows() {
  try {
    const responseFromApi = yield call(fetchBowsApi);
    const bows = responseFromApi.data.bows;

    yield put({
      type: FETCH_BOWS_SUCCEEDED,
      payload: {
        bows: bows
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_BOWS_FAILED,
      payload: error
    });
  }
};

export function* fetchBowsSaga() {
  yield takeEvery(FETCH_BOWS_REQUESTED, fetchBows);
};
