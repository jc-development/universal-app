import { combineReducers } from 'redux';
import cartReducer from './cart/cart-reducer';
import productReducer from './product/product-reducer';
import collectionReducer from './collection/collection-reducer';

const shopifyReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  collection: collectionReducer,
});

export default shopifyReducer;
