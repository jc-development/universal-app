export const SET_BOW_MODEL_REQUESTED = 'SET_BOW_MODEL_REQUESTED';
export const SET_BOW_MODEL_SUCCEEDED = 'SET_BOW_MODEL_SUCCEEDED';
export const SET_BOW_MODEL_FAILED = 'SET_BOW_MODEL_FAILED';

export const SET_BOW_SKU_REQUESTED = 'SET_BOW_SKU_REQUESTED';
export const SET_BOW_SKU_SUCCEEDED = 'SET_BOW_SKU_SUCCEEDED';
export const SET_BOW_SKU_FAILED = 'SET_BOW_SKU_FAILED';

export const CLEAR_BOW_MODEL_REQUESTED = 'CLEAR_BOW_MODEL_REQUESTED';
export const CLEAR_BOW_MODEL_SUCCEEDED = 'CLEAR_BOW_MODEL_SUCCEEDED';
export const CLEAR_BOW_MODEL_FAILED = 'CLEAR_BOW_MODEL_FAILED';

// All Bow Model action creators
export const setBowModel = (bow) => {
  return {
   type: SET_BOW_MODEL_REQUESTED,
   payload: bow
  }
};


export const setBowSku = (sku) => {
  return {
    type: SET_BOW_SKU_REQUESTED,
    payload: sku
  };
};

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
