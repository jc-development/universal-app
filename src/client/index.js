import { render } from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { loadComponents } from 'loadable-components';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootSagas from '../shared/app/rootSagas';
import bowsReducer from '../shared/bows/bows-list-compare/bows-reducer';
import bowModelReducer from '../shared/bows/bow-model/bow-model-reducer';
import dealersReducer from '../shared/dealer-locator/dealers-reducer';
import selectDealerReducer from '../shared/bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/add-to-cart/select-dealer/select-dealer-reducer';
import bowAccessoriesReducer from '../shared/bows/bow-model/child-components/bow-config-panel/accessories/bow-accessories-reducer';
// import mainNavReducer from '../shared/main-nav/main-nav-reducer';
import bowFamilyReducer from '../shared/bows/bow-model/assets/utilities/bow-family/bow-family-reducer';
import productRecommendationsReducer from '../shared/add-to-cart-modal/child-components/product-recommendations/product-recommendations-reducer';

import shopifyReducer from '../shared/reusable/shopify/shopify-reducer';

import ScrollToTop from '../shared/app/ScrollToTop'

import App from '../shared/app';

import { polyfill } from 'es6-promise'; polyfill();
import "babel-polyfill";

// grab the state from a global variable injected into the server generated HTML
const preloadedState = window.__PRELOADED_STATE__;

const reducer = combineReducers({
  routing: routerReducer,
  bowFamily: bowFamilyReducer,
  bows: bowsReducer,
  bowAccessories: bowAccessoriesReducer,
  customerConfiguredBowModel: bowModelReducer,
  dealers: dealersReducer,
  shopify: shopifyReducer,
  selectedDealer: selectDealerReducer,
  // mainNavHeight: mainNavReducer,
  productRecommendations:productRecommendationsReducer
});

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

// garbage collect past state
delete window.__PRELOADED_STATE__;

const store = createStore(
  reducer,
  preloadedState,
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSagas);

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <App {...this.props} />
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

loadComponents().then( () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
});
