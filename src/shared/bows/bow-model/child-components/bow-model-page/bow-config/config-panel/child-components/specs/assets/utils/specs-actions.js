export const SET_LENGTH_REQUESTED = 'SET_LENGTH_REQUESTED';
export const SET_LENGTH_SUCCEEDED = 'SET_LENGTH_SUCCEEDED';
export const SET_LENGTH_FAILED = 'SET_LENGTH_FAILED';

export const SET_WEIGHT_REQUESTED = 'SET_WEIGHT_REQUESTED';
export const SET_WEIGHT_SUCCEEDED = 'SET_WEIGHT_SUCCEEDED';
export const SET_WEIGHT_FAILED = 'SET_WEIGHT_FAILED';

export const SET_HAND_REQUESTED = 'SET_HAND_REQUESTED';
export const SET_HAND_SUCCEEDED = 'SET_HAND_SUCCEEDED';
export const SET_HAND_FAILED = 'SET_HAND_FAILED';

export const setLength = (length) => {
  return {
    type: SET_LENGTH_REQUESTED,
    payload: length
  };
};

export const setWeight = (weight) => {
  return {
    type: SET_WEIGHT_REQUESTED,
    payload: weight
  };
};

export const setHand = (hand) => {
  return {
    type: SET_HAND_REQUESTED,
    payload: hand
  };
};
