import { FETCH_BOWS_SUCCEEDED } from './actions';

const initialState = [];

const bowsReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BOWS_SUCCEEDED:
      return payload.bows;

    default:
      return previousState;
  }
};

export default bowsReducer;
