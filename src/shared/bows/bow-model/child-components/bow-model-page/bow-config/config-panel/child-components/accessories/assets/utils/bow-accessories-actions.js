export const FETCH_BOW_ACCESSORIES_REQUESTED = 'FETCH_BOW_ACCESSORIES_REQUESTED';
export const FETCH_BOW_ACCESSORIES_SUCCEEDED = 'FETCH_BOW_ACCESSORIES_SUCCEEDED';
export const FETCH_BOW_ACCESSORIES_FAILED = 'FETCH_BOW_ACCESSORIES_FAILED';

export const DELETE_BOW_ACCESSORY_REQUESTED = 'DELETE_BOW_ACCESSORY_REQUESTED';
export const DELETE_BOW_ACCESSORY_SUCCEEDED = 'DELETE_BOW_ACCESSORY_SUCCEEDED';
export const DELETE_BOW_ACCESSORY_FAILED = 'DELETE_BOW_ACCESSORY_FAILED';


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


export const deleteBowAccessory = (payload) => {
  // console.log('deleteBowAccessory payload: ', payload);

  return {
    type: DELETE_BOW_ACCESSORY_REQUESTED,
    payload
  };
};
