import {
  FETCH_PRODUCT_RECOMMENDATIONS_SUCCEEDED,
  FETCH_PRODUCT_RECOMMENDATIONS_FAILED,
  CLEAR_PRODUCT_RECOMMENDATIONS_SUCCEEDED,
  CLEAR_PRODUCT_RECOMMENDATIONS_FAILED,
 } from './actions';

const initialState = [];

const productRecommendationsReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCT_RECOMMENDATIONS_SUCCEEDED:
      return payload;

    case FETCH_PRODUCT_RECOMMENDATIONS_FAILED:
      return initialState;

    case CLEAR_PRODUCT_RECOMMENDATIONS_SUCCEEDED:
      return initialState;

    case CLEAR_PRODUCT_RECOMMENDATIONS_FAILED:
      return initialState;

    default:
      return previousState;
  }
};

export default productRecommendationsReducer;
