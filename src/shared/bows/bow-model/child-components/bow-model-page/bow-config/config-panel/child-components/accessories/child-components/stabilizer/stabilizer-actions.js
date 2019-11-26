export const SET_STABILIZER_REQUESTED = 'SET_STABILIZER_REQUESTED';
export const SET_STABILIZER_SUCCEEDED = 'SET_STABILIZER_SUCCEEDED';
export const SET_STABILIZER_FAILED = 'SET_STABILIZER_FAILED';

export const setStabilizer = (stabilizer) => {
  return {
    type: SET_STABILIZER_REQUESTED,
    payload: stabilizer
  }
};
