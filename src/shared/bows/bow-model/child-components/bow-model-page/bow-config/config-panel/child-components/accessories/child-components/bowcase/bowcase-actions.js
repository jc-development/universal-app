export const SET_BOWCASE_REQUESTED = 'SET_BOWCASE_REQUESTED';
export const SET_BOWCASE_SUCCEEDED = 'SET_BOWCASE_SUCCEEDED';
export const SET_BOWCASE_FAILED = 'SET_BOWCASE_FAILED';

export const setBowCase = (bowcase) => {
  return {
    type: SET_BOWCASE_REQUESTED,
    payload: bowcase
  }
};
