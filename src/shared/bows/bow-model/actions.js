export const FETCH_BOW_MODEL_REQUESTED = 'FETCH_BOW_MODEL_REQUESTED';
export const FETCH_BOW_MODEL_SUCCEEDED = 'FETCH_BOW_MODEL_SUCCEEDED';
export const FETCH_BOW_MODEL_FAILED = 'FETCH_BOW_MODEL_FAILED';

export const CLEAR_BOW_MODEL_REQUESTED = 'CLEAR_BOW_MODEL_REQUESTED';
export const CLEAR_BOW_MODEL_SUCCEEDED = 'CLEAR_BOW_MODEL_SUCCEEDED';
export const CLEAR_BOW_MODEL_FAILED = 'CLEAR_BOW_MODEL_FAILED';

// All Bow Model action creators
export const fetchBowModel = (bowModel) => {
  return {
   type: FETCH_BOW_MODEL_REQUESTED,
   payload: bowModel
  }
};

export const receiveBowModel = (payload) => ({
  type: FETCH_BOW_MODEL_SUCCEEDED,
  payload
});

export const clearBowModel = () => {
  return {
    type: CLEAR_BOW_MODEL_REQUESTED
  };
};

export const bowModelCleared = (payload) => {
  return {
    type: CLEAR_BOW_MODEL_SUCCEEDED,
    payload
  };
}
