import { SELECT_DEALER_SUCCEEDED, SELECTED_DEALER_SUCCEEDED } from './actions';

const initialState = {
  dealerName: "N/A",
  dealerAddress: "N/A",
  dealerPhone: "N/A",
  dealerEmail: "N/A"
};

const selectDealerReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_DEALER_SUCCEEDED:
      return payload;

    case SELECTED_DEALER_SUCCEEDED:
      return payload;

    default:
      return previousState;
  }
};

export default selectDealerReducer;
