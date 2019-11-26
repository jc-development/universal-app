export const SET_REST_REQUESTED = 'SET_REST_REQUESTED';
export const SET_REST_SUCCEEDED = 'SET_REST_SUCCEEDED';
export const SET_REST_FAILED = 'SET_REST_FAILED';

export const setRest = (rest) => {
  return {
    type: SET_REST_REQUESTED,
    payload: rest
  }
};
