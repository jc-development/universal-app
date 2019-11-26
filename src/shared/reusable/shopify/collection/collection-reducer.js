import {
  GET_COLLECTION_BY_HANDLE_SUCCEEDED,
  GET_COLLECTION_BY_HANDLE_FAILED,
  CLEAR_COLLECTION_SUCCEEDED,
  CLEAR_COLLECTION_FAILED,
  GET_APPAREL_COLLECTIONS_SUCCEEDED,
  GET_APPAREL_COLLECTIONS_FAILED,
  GET_ACCESSORIES_COLLECTIONS_SUCCEEDED,
  GET_ACCESSORIES_COLLECTIONS_FAILED,
  GET_FEATURED_COLLECTIONS_SUCCEEDED,
  GET_FEATURED_COLLECTIONS_FAILED,
  GET_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED,
  GET_FILTERED_COLLECTION_PRODUCTS_FAILED,
  CLEAR_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED,
  CLEAR_FILTERED_COLLECTION_PRODUCTS_FAILED,
} from './actions';

const initialState = {
  selected: {
    id: "",
    handle: "",
    title: "",
    description: "",
    image: null,
    products: [],
    filteredProducts: null
  },
  list: [],
  accessories: [],
  apparel: [],
  featuredAccessories: {
    products: []
  },
  featuredApparel: {
    products: []
  }
};

const insertCollectionInList = (array, payload) => {
  const foundCollection = array.find(arrayItem => arrayItem.id === payload.id)
  if(foundCollection) {
    // console.log('update existing collection info')
    return array.map(item => {
      if(item.id !== payload.id) {
        return item
      }
      return payload
    })
  } else {
    return [
      ...array,
      payload
    ]
  }
}

const insertCollectionsInList = (array, payload) => {
  const oldList = array.filter(arrayItem => !payload.some(collection => collection.id === arrayItem.id));
  return oldList.concat(payload);
}

const collectionReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case GET_COLLECTION_BY_HANDLE_SUCCEEDED:
      return {
        ...previousState,
        selected: payload,
        list: insertCollectionInList(previousState.list, payload)
      }

    case GET_COLLECTION_BY_HANDLE_FAILED:
      return {
        ...previousState,
        selected: initialState.selected
      }

    case CLEAR_COLLECTION_SUCCEEDED:
      return {
        ...previousState,
        selected: initialState.selected
      }

    case CLEAR_COLLECTION_FAILED:
      return {
        ...previousState,
        selected: initialState.selected
      }

    case GET_APPAREL_COLLECTIONS_SUCCEEDED:
      return {
        ...previousState,
        apparel: payload,
        list: insertCollectionsInList(previousState.list, payload)
      }

    case GET_APPAREL_COLLECTIONS_FAILED:
      return {
        ...previousState,
        apparel: initialState.selected
      }
    
    case GET_ACCESSORIES_COLLECTIONS_SUCCEEDED:
      return {
        ...previousState,
        accessories: payload,
        list: insertCollectionsInList(previousState.list, payload)
      }

    case GET_ACCESSORIES_COLLECTIONS_FAILED:
      return {
        ...previousState,
        accessories: initialState.selected
      }

    case GET_FEATURED_COLLECTIONS_SUCCEEDED:
      return {
        ...previousState,
        featuredApparel: payload.find(collection => collection.handle === "featured-apparel"),
        featuredAccessories: payload.find(collection => collection.handle === "featured-accessories"),
        list: insertCollectionsInList(previousState.list, payload)
      }

    case GET_FEATURED_COLLECTIONS_FAILED:
      return {
        ...previousState,
        featuredApparel: initialState.featuredApparel,
        featuredAccessories: initialState.featuredAccessories,
      }

    case GET_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED:
      return {
        ...previousState,
        selected: {
          ...previousState.selected,
          filteredProducts: payload
        }
      }

    case GET_FILTERED_COLLECTION_PRODUCTS_FAILED:
      return {
        ...previousState
      }

    case CLEAR_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED:
      return {
        ...previousState,
        selected: {
          ...previousState.selected,
          filteredProducts: initialState.selected.filteredProducts
        }
      }

    case CLEAR_FILTERED_COLLECTION_PRODUCTS_FAILED:
      return {
        ...previousState,
        selected: {
          ...previousState.selected,
          filteredProducts: initialState.selected.filteredProducts
        }
      }

    default:
      return previousState;
  }
};

export default collectionReducer;
