export const SET_SLING_REQUESTED = 'SET_SLING_REQUESTED';
export const SET_SLING_SUCCEEDED = 'SET_SLING_SUCCEEDED';
export const SET_SLING_FAILED = 'SET_SLING_FAILED';

export const setSling = (sling) => {
  return {
    type: SET_SLING_REQUESTED,
    payload: sling
  }
};
