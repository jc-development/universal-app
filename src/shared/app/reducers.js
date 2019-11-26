import { combineReducers } from 'redux';
import {routerReducer } from 'react-router-redux';
import bowsReducer from './../bows/bows-list-compare/bows-reducer';
import bowModelReducer from './../bows/bow-model/bow-model-reducer';
import dealersReducer from './../dealer-locator/dealers-reducer';
import selectDealerReducer from './../shared/bows/bow-model/child-components/bow-config-panel/select-dealer/select-dealer-reducer';
import bowAccessoriesReducer from './../shared/bows/bow-model/child-components/bow-config-panel/accessories/bow-accessories-reducer';
// import mainNavReducer from '../shared/main-nav/main-nav-reducer';
import bowFamilyReducer from '../bows/bow-model/assets/utilities/bow-family/bow-family-reducer';

import productRecommendationsReducer from '../add-to-cart-modal/child-components/product-recommendations/product-recommendations-reducer';

import shopifyReducer from './../reusable/shopify/shopify-reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  bowFamily: bowFamilyReducer,
  bows: bowsReducer,
  bowModel: bowModelReducer,
  bowAccessories: bowAccessoriesReducer,
  dealers: dealersReducer,
  shopify: shopifyReducer,
  selectedDealer: selectDealerReducer,
  // mainNavHeight: mainNavReducer,
  productRecommendations:productRecommendationsReducer
});

export default rootReducer;
