import { FETCH_BOW_FAMILY_REQUESTED, FETCH_BOW_FAMILY_SUCCEEDED, FETCH_BOW_FAMILY_FAILED, CLEAR_BOW_FAMILY_SUCCEEDED } from './bow-family-actions';

const initialState = {
  bows : []
};

const bowFamilyReducer = (previousState = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_BOW_FAMILY_SUCCEEDED:
      return payload.bowFamily;

    case FETCH_BOW_FAMILY_FAILED:
      return payload.bowFamily; // prob make it something else

    case CLEAR_BOW_FAMILY_SUCCEEDED:
      return initialState;

      default:
        return previousState;
  };
}

export default bowFamilyReducer;
