import { FETCH_MEMBERS_SUCCEEDED } from './actions';

const initialState = [];

const homeReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MEMBERS_SUCCEEDED:
      return payload.members;

    default:
      return previousState;
  }
};

export default homeReducer;
