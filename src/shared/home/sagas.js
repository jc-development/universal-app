import { all, call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
  FETCH_MEMBERS_REQUESTED,
  FETCH_MEMBERS_SUCCEEDED,
  FETCH_MEMBERS_FAILED
} from './actions';

export const fetchUrl = () => fetch('https://place-where-member-profile-data-is', {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}).then( (response) => {
  if (!response.ok) {
    throw new Error();
  }

  return response.json();
} );

export function* fetchMembers() {
  try {
    const members = yield call(fetchUrl);

    yield put({
      type: FETCH_MEMBERS_SUCCEEDED,
      payload: {
        members: members.map( member => ({
          id: member.id,
          name: member.name || 'member name'
        }))
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_MEMBERS_FAILED,
      payload: error
    });
  }
};

export function* fetchMembersSaga() {
  yield takeEvery(FETCH_MEMBERS_REQUESTED, fetchMembers);
};

export default function* rootSaga() {
  yield all([
    fetchMembersSaga()
  ]);
};
