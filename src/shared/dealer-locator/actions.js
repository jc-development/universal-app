export const FETCH_DEALERS_REQUESTED = 'FETCH_DEALERS_REQUESTED';
export const FETCH_DEALERS_SUCCEEDED = 'FETCH_DEALERS_SUCCEEDED';
export const FETCH_DEALERS_FAILED = 'FETCH_DEALERS_FAILED';

// All dealers action creators
export const fetchDealers = () => ({
  type: FETCH_DEALERS_REQUESTED,
  payload: {}
});

export const receiveDealers = (payload) => ({
  type: FETCH_DEALERS_SUCCEEDED,
  payload
});
