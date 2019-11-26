import { 
  CREATE_CART_SUCCEEDED,
  REPLACE_CART_LINE_ITEMS_SUCCEEDED,
  APPLY_DISCOUNT_CODE_SUCCEEDED,
  APPLY_DISCOUNT_CODE_FAILED,
  REMOVE_DISCOUNT_CODE_SUCCEEDED,
  OPTIMISTIC_CART_UPDATE_SUCCEEDED,
  REMOVE_DISCOUNT_CODE_ERROR_SUCCEEDED,
} from './actions';

const initialState = {
  id: "",
  webUrl: "",
  lineItems: [],
  lineItemsSubtotalPrice: "0.00",
  subtotalPrice: "0.00",
  totalPrice: "0.00",
  discountApplications: [],
  checkoutReady: false,
  discountError: null
};

const cartReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_CART_SUCCEEDED:
      return payload;

    case REPLACE_CART_LINE_ITEMS_SUCCEEDED:
      return payload;

    case APPLY_DISCOUNT_CODE_SUCCEEDED:
      return payload;
    
    case APPLY_DISCOUNT_CODE_FAILED:
      return {
        ...previousState,
        discountError: payload
      }
      
    case REMOVE_DISCOUNT_CODE_SUCCEEDED:
      return payload;

    case OPTIMISTIC_CART_UPDATE_SUCCEEDED:
      return payload;

    case REMOVE_DISCOUNT_CODE_ERROR_SUCCEEDED:
      return {
        ...previousState,
        discountError: null
      }

    default:
      return previousState;
  }
};

export default cartReducer;
