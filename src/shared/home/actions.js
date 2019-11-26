export const FETCH_MEMBERS_REQUESTED = 'FETCH_MEMBERS_REQUESTED';
export const FETCH_MEMBERS_SUCCEEDED = 'FETCH_MEMBERS_SUCCEEDED';
export const FETCH_MEMBERS_FAILED = 'FETCH_MEMBERS_FAILED';

export const fetchMembers = () => ({
  type: FETCH_MEMBERS_REQUESTED,
  payload: {}
});

export const receiveMembers = (payload) => ({
  type: FETCH_MEMBERS_SUCCEEDED,
  payload
})
