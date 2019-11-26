export const SET_ARROW_REQUESTED = 'SET_ARROW_REQUESTED';
export const SET_ARROW_SUCCEEDED = 'SET_ARROW_SUCCEEDED';
export const SET_ARROW_FAILED = 'SET_ARROW_FAILED';

export const setArrow = (arrow) => {
  return {
    type: SET_ARROW_REQUESTED,
    payload: arrow
  }
};
