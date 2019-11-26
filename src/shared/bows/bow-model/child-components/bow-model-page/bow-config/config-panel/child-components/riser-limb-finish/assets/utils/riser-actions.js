export const SET_RISER_COLOR_REQUESTED = 'SET_RISER_COLOR_REQUESTED';
export const SET_RISER_COLOR_SUCCEEDED = 'SET_RISER_COLOR_SUCCEEDED';
export const SET_RISER_COLOR_FAILED = 'SET_RISER_COLOR_FAILED';

export const FETCH_RISER_COLOR_REQUESTED = 'FETCH_RISER_COLOR_REQUESTED';
export const FETCH_RISER_COLOR_SUCCEEDED = 'FETCH_RISER_COLOR_SUCCEEDED';
export const FETCH_RISER_COLOR_FAILED = 'FETCH_RISER_COLOR_FAILED';

export const setRiserColor = (color) => {
  return {
    type: SET_RISER_COLOR_REQUESTED,
    payload: color
  }
};

export const getRiserColor = () => {
  return {
    type: FETCH_RISER_COLOR_REQUESTED
  };
}
