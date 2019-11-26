import { FETCH_DEALERS_SUCCEEDED } from './actions';

const initialState = [];

const dealersReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {

    case FETCH_DEALERS_SUCCEEDED:
      return payload.dealers;

    default:
      return previousState;
  }
};

export default dealersReducer;
