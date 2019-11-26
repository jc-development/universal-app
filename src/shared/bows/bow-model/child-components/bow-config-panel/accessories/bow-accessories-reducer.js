import { FETCH_BOW_ACCESSORIES_SUCCEEDED } from './actions';

const initialState = [];

const bowAccessoriesReducer = (previousState = initialState, { type, payload}) => {
  switch (type) {
    case FETCH_BOW_ACCESSORIES_SUCCEEDED:
      return payload.bowAccessories;

    default:
      return previousState;
  }
};

export default bowAccessoriesReducer;
