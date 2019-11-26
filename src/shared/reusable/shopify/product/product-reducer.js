import {
  GET_PRODUCT_BY_HANDLE_SUCCEEDED,
  GET_PRODUCT_BY_HANDLE_FAILED,
  CLEAR_PRODUCT_SUCCEEDED,
  CLEAR_PRODUCT_FAILED,
  // SET_STORE_PRODUCT_BY_HANDLE_SUCCEEDED,
  // SET_STORE_PRODUCT_BY_HANDLE_FAILED,
  // SET_STORE_FEATURED_PRODUCT_BY_HANDLE_SUCCEEDED,
  // SET_STORE_FEATURED_PRODUCT_BY_HANDLE_FAILED,
 } from './actions';

const initialState = {
    id: "",
    handle: "",
    title: "",
    tags: [],
    availableForSale: true,
    description: "",
    descriptionHtml: "",
    priceRange: {
      minVariantPrice: "",
      maxVariantPrice: ""
    },
    images: [
      {
        id: "",
        altText: "",
        originalSrc: "",
        transformedSrc: ""    
      }
    ],
    options: [
      {
        id: "",
        name: "",
        values: []
      }
    ],
    variants: [
      {
        id: "",
        title: "",
        sku: "",
        availableForSale: true,
        price: null,
        compareAtPrice: null,
        image: null,
        selectedOptions: [
          {
            name: "",
            value: ""
          }
        ]
      }
    ]
};

const productReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_BY_HANDLE_SUCCEEDED:
      return payload;

    case GET_PRODUCT_BY_HANDLE_FAILED:
      return initialState;

    case CLEAR_PRODUCT_SUCCEEDED:
      return initialState;

    case CLEAR_PRODUCT_FAILED:
      return initialState;

    // case SET_STORE_PRODUCT_BY_HANDLE_SUCCEEDED:
    //   return payload;

    // case SET_STORE_PRODUCT_BY_HANDLE_FAILED:
    //   return initialState;

    // case SET_STORE_FEATURED_PRODUCT_BY_HANDLE_SUCCEEDED:
    //   return payload;

    // case SET_STORE_FEATURED_PRODUCT_BY_HANDLE_FAILED:
    //   return initialState;

    default:
      return previousState;
  }
};

export default productReducer;
