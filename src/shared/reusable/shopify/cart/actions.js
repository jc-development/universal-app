export const CREATE_CART_REQUESTED = 'CREATE_CART_REQUESTED';
export const CREATE_CART_SUCCEEDED = 'CREATE_CART_SUCCEEDED';
export const CREATE_CART_FAILED = 'CREATE_CART_FAILED';

export const REPLACE_CART_LINE_ITEMS_REQUESTED = 'REPLACE_CART_LINE_ITEMS_REQUESTED';
export const REPLACE_CART_LINE_ITEMS_SUCCEEDED = 'REPLACE_CART_LINE_ITEMS_SUCCEEDED';
export const REPLACE_CART_LINE_ITEMS_FAILED = 'REPLACE_CART_LINE_ITEMS_FAILED';

export const APPLY_DISCOUNT_CODE_REQUESTED = 'APPLY_DISCOUNT_CODE_REQUESTED';
export const APPLY_DISCOUNT_CODE_SUCCEEDED = 'APPLY_DISCOUNT_CODE_SUCCEEDED';
export const APPLY_DISCOUNT_CODE_FAILED = 'APPLY_DISCOUNT_CODE_FAILED';

export const REMOVE_DISCOUNT_CODE_REQUESTED = 'REMOVE_DISCOUNT_CODE_REQUESTED';
export const REMOVE_DISCOUNT_CODE_SUCCEEDED = 'REMOVE_DISCOUNT_CODE_SUCCEEDED';
export const REMOVE_DISCOUNT_CODE_FAILED = 'REMOVE_DISCOUNT_CODE_FAILED';

export const OPTIMISTIC_CART_UPDATE_REQUESTED = 'OPTIMISTIC_CART_UPDATE_REQUESTED';
export const OPTIMISTIC_CART_UPDATE_SUCCEEDED = 'OPTIMISTIC_CART_UPDATE_SUCCEEDED';
export const OPTIMISTIC_CART_UPDATE_FAILED = 'OPTIMISTIC_CART_UPDATE_FAILED';

export const REMOVE_DISCOUNT_CODE_ERROR_REQUESTED = 'REMOVE_DISCOUNT_CODE_ERROR_REQUESTED';
export const REMOVE_DISCOUNT_CODE_ERROR_SUCCEEDED = 'REMOVE_DISCOUNT_CODE_ERROR_SUCCEEDED';
export const REMOVE_DISCOUNT_CODE_ERROR_FAILED = 'REMOVE_DISCOUNT_CODE_ERROR_FAILED';

export const createCart = (lineItems) => ({
  type: CREATE_CART_REQUESTED,
  lineItems
});

export const receiveCreateCart = (payload) => ({
  type: CREATE_CART_SUCCEEDED,
  payload
});


export const replaceCartLineItems = (checkoutId, lineItems) => {
  return {
    type: REPLACE_CART_LINE_ITEMS_REQUESTED,
    checkoutId,
    lineItems
  }
};

export const receiveReplaceCartLineItems = (payload) => ({
  type: REPLACE_CART_LINE_ITEMS_SUCCEEDED,
  payload
});

export const applyDiscountCode = (checkoutId, discountCode) => {
  return {
    type: APPLY_DISCOUNT_CODE_REQUESTED,
    checkoutId,
    discountCode
  }
};

export const receiveApplyDiscountCode = (payload) => ({
  type: APPLY_DISCOUNT_CODE_SUCCEEDED,
  payload
});

export const removeDiscountCode = (checkoutId) => ({
  type: REMOVE_DISCOUNT_CODE_REQUESTED,
  checkoutId
});

export const receiveRemoveDiscountCode = (payload) => ({
  type: REMOVE_DISCOUNT_CODE_SUCCEEDED,
  payload
});

export const updateCart = (lineItems) => ({
  type: OPTIMISTIC_CART_UPDATE_REQUESTED,
  lineItems
});

export const receiveUpdateCart = (payload) => ({
  type: OPTIMISTIC_CART_UPDATE_SUCCEEDED,
  payload
});

export const removeDiscountCodeError = () => ({
  type: REMOVE_DISCOUNT_CODE_ERROR_REQUESTED,
});

export const receiveRemoveDiscountCodeError = () => ({
  type: REMOVE_DISCOUNT_CODE_ERROR_SUCCEEDED,
});