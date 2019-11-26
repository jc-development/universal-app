export const GET_PRODUCT_BY_HANDLE_REQUESTED = 'GET_PRODUCT_BY_HANDLE_REQUESTED';
export const GET_PRODUCT_BY_HANDLE_SUCCEEDED = 'GET_PRODUCT_BY_HANDLE_SUCCEEDED';
export const GET_PRODUCT_BY_HANDLE_FAILED = 'GET_PRODUCT_BY_HANDLE_FAILED';

export const CLEAR_PRODUCT_REQUESTED = 'CLEAR_PRODUCT_REQUESTED';
export const CLEAR_PRODUCT_SUCCEEDED = 'CLEAR_PRODUCT_SUCCEEDED';
export const CLEAR_PRODUCT_FAILED = 'CLEAR_PRODUCT_FAILED';

// export const SET_STORE_PRODUCT_BY_HANDLE_REQUESTED = 'SET_STORE_PRODUCT_BY_HANDLE_REQUESTED';
// export const SET_STORE_PRODUCT_BY_HANDLE_SUCCEEDED = 'SET_STORE_PRODUCT_BY_HANDLE_SUCCEEDED';
// export const SET_STORE_PRODUCT_BY_HANDLE_FAILED = 'SET_STORE_PRODUCT_BY_HANDLE_FAILED';

// export const SET_STORE_FEATURED_PRODUCT_BY_HANDLE_REQUESTED = 'SET_STORE_FEATURED_PRODUCT_BY_HANDLE_REQUESTED';
// export const SET_STORE_FEATURED_PRODUCT_BY_HANDLE_SUCCEEDED = 'SET_STORE_FEATURED_PRODUCT_BY_HANDLE_SUCCEEDED';
// export const SET_STORE_FEATURED_PRODUCT_BY_HANDLE_FAILED = 'SET_STORE_FEATURED_PRODUCT_BY_HANDLE_FAILED';

// Get Store Product with Product Handle action creators
export const getProductByHandle = (productHandle) => ({
  type: GET_PRODUCT_BY_HANDLE_REQUESTED,
  productHandle
});

export const receiveProductByHandle = (payload) => ({
  type: GET_PRODUCT_BY_HANDLE_SUCCEEDED,
  payload
});

export const clearProduct = (payload) => {
  return {
    type: CLEAR_PRODUCT_REQUESTED,
    payload
  };
};

// // Get Store Product with Product Handle from local redux store action creators
// export const findStoreProductByHandle = (collectionProductType, collectionHandle, productHandle) => ({
//   type: SET_STORE_PRODUCT_BY_HANDLE_REQUESTED,
//   collectionProductType,
//   collectionHandle,
//   productHandle
// });

// export const foundStoreProductByHandle = (payload) => ({
//   type: SET_STORE_PRODUCT_BY_HANDLE_SUCCEEDED,
//   payload
// });

// // Get Store Featured Product with Product Handle from local redux store action creators
// export const findStoreFeaturedProductByHandle = (collectionHandle, productHandle) => ({
//   type: SET_STORE_FEATURED_PRODUCT_BY_HANDLE_REQUESTED,
//   collectionHandle,
//   productHandle
// });

// export const foundStoreFeaturedProductByHandle = (payload) => ({
//   type: SET_STORE_FEATURED_PRODUCT_BY_HANDLE_SUCCEEDED,
//   payload
// });
