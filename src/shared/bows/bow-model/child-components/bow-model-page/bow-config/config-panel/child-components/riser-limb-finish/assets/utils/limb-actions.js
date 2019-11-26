export const SET_LIMB_COLOR_REQUESTED = 'SET_LIMB_COLOR_REQUESTED';
export const SET_LIMB_COLOR_SUCCEEDED = 'SET_LIMB_COLOR_SUCCEEDED';
export const SET_LIMB_COLOR_FAILED = 'SET_LIMB_COLOR_FAILED';

export const setLimbColor = (color) => {
  return {
    type: SET_LIMB_COLOR_REQUESTED,
    payload: color
  }
};
