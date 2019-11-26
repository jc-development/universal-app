export const SET_QUIVER_REQUESTED = 'SET_QUIVER_REQUESTED';
export const SET_QUIVER_SUCCEEDED = 'SET_QUIVER_SUCCEEDED';
export const SET_QUIVER_FAILED = 'SET_QUIVER_FAILED';

export const setQuiver = (quiver) => {
  return {
    type: SET_QUIVER_REQUESTED,
    payload: quiver
  }
};
