// This works with the main-nav-reducer

export const FETCH_MAIN_NAV_HEIGHT_REQUESTED = 'FETCH_MAIN_NAV_HEIGHT_REQUESTED';
export const FETCH_MAIN_NAV_HEIGHT_SUCCEEDED = 'FETCH_MAIN_NAV_HEIGHT_SUCCEEDED';
export const FETCH_MAIN_NAV_HEIGHT_FAILED = 'FETCH_MAIN_NAV_HEIGHT_FAILED';

export const fetchMainNavHeight = () => {
  return {
    type: FETCH_MAIN_NAV_HEIGHT_REQUESTED
  };
};

export const fetchMainHeightReceived = (payload) => {
  return {
    type: FETCH_MAIN_NAV_HEIGHT_SUCCEEDED,
    payload
  };
};
