export const FETCH_BOW_FAMILY_REQUESTED = 'FETCH_BOW_FAMILY_REQUESTED';
export const FETCH_BOW_FAMILY_SUCCEEDED = 'FETCH_BOW_FAMILY_SUCCEEDED';
export const FETCH_BOW_FAMILY_FAILED = 'FETCH_BOW_FAMILY_FAILED';

export const CLEAR_BOW_FAMILY_REQUESTED = 'CLEAR_BOW_FAMILY_REQUESTED';
export const CLEAR_BOW_FAMILY_SUCCEEDED = 'CLEAR_BOW_FAMILY_SUCCEEDED';
export const CLEAR_BOW_FAMILY_FAILED = 'CLEAR_BOW_FAMILY_FAILED';

export const fetchBowFamily = (bowFamilyName) => {
  // console.log('bowFamilyName in action creator: ', bowFamilyName);
  return {
    type: FETCH_BOW_FAMILY_REQUESTED,
    payload: bowFamilyName
  };
};

export const receiveBowFamily = (payload) => {
  // console.log('payload: ', payload);
  return {
    type: FETCH_BOW_FAMILY_SUCCEEDED,
    payload
  };
}

export const clearBowFamily = () => {
  return {
    type: CLEAR_BOW_FAMILY_REQUESTED
  };
};

export const bowFamilyCleared = (payload) => {
  return {
    type: CLEAR_BOW_FAMILY_SUCCEEDED,
    payload
  };
}
