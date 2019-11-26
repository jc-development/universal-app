import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createMemoryHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';

import bowsReducer from './../shared/bows/bows-list-compare/bows-reducer';
import bowModelReducer from './../shared/bows/bow-model/bow-model-reducer';
import dealersReducer from '../shared/dealer-locator/dealers-reducer';
import selectDealerReducer from './../shared/bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/add-to-cart/select-dealer/select-dealer-reducer';
import bowAccessoriesReducer from '../shared/bows/bow-model/child-components/bow-config-panel/accessories/bow-accessories-reducer';
import bowFamilyReducer from '../shared/bows/bow-model/assets/utilities/bow-family/bow-family-reducer';
import productRecommendationsReducer from './../shared/add-to-cart-modal/child-components/product-recommendations/product-recommendations-reducer';

import shopifyReducer from './../shared/reusable/shopify/shopify-reducer';

const sagaMiddleware = createSagaMiddleware();

const reduxMiddlewares = [
  routerMiddleware( createMemoryHistory() ),
  sagaMiddleware
];

export default (initialState) => {
  const store = createStore(
    combineReducers({
      bowFamily: bowFamilyReducer,
      bows: bowsReducer,
      customerConfiguredBowModel: bowModelReducer,
      bowAccessories: bowAccessoriesReducer,
      dealers: dealersReducer,
      shopify: shopifyReducer,
      selectedDealer: selectDealerReducer,
      productRecommendations:productRecommendationsReducer
    }),
    initialState,
    compose( applyMiddleware(...reduxMiddlewares) )
  );

  store.runSaga = sagaMiddleware.run;

  store.close = () => store.dispatch(END);

  return store;
}
