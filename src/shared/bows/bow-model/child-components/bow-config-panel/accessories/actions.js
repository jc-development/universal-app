export const FETCH_BOW_ACCESSORIES_REQUESTED = 'FETCH_BOW_ACCESSORIES_REQUESTED';
export const FETCH_BOW_ACCESSORIES_SUCCEEDED = 'FETCH_BOW_ACCESSORIES_SUCCEEDED';
export const FETCH_BOW_ACCESSORIES_FAILED = 'FETCH_BOW_ACCESSORIES_FAILED';

export const fetchBowAccessories = () => {
  return {
    type: FETCH_BOW_ACCESSORIES_REQUESTED,
    payload: {}
  }
};

export const recieveBowAccessories = (payload) => {
  return {
    type: FETCH_BOW_ACCESSORIES_SUCCEEDED,
    payload
  }
};
