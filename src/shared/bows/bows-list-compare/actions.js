export const FETCH_BOWS_REQUESTED = 'FETCH_BOWS_REQUESTED';
export const FETCH_BOWS_SUCCEEDED = 'FETCH_BOWS_SUCCEEDED';
export const FETCH_BOWS_FAILED = 'FETCH_BOWS_FAILED';

// All Bows action creators
export const fetchBows = () => ({
  type: FETCH_BOWS_REQUESTED,
  payload: {}
});

export const receiveBows = (payload) => ({
  type: FETCH_BOWS_SUCCEEDED,
  payload
});
