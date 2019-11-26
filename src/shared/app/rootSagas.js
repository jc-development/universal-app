import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchBowsSaga } from './../bows/bows-list-compare/bows-sagas';
// import { fetchBowModelSaga, clearBowModelSaga } from './../bows/bow-model/bow-model-sagas';

import { setBowModelSaga, setBowSkuSaga, clearBowModelSaga } from './../bows/bow-model/bow-model-sagas';
import { setRiserColorSaga, fetchRiserColorSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/riser-limb-finish/assets/utils/riser-sagas';
import { setLimbColorSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/riser-limb-finish/assets/utils/limb-sagas';
import { setLengthSaga, setWeightSaga, setHandSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/specs/assets/utils/specs-sagas';
import { setQuiverSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/quiver/quiver-sagas';
import { setStabilizerSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/stabilizer/stabilizer-sagas';
import { setRestSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/rest/rest-sagas';
import { setSlingSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/sling/sling-sagas';
import { setArrowSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/arrow/arrow-sagas';
import { setBowCaseSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/bowcase/bowcase-sagas';
import { setStepSummarySaga, fetchStepSummarySaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/bow-view/step-summary/step-summary-sagas';

import { fetchBuildSummarySaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/summary/build-summary-sagas';

import { fetchDealersSaga } from './../dealer-locator/dealers-sagas'

import { selectDealerSaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/add-to-cart/select-dealer/select-dealer-sagas';
import { fetchBowAccessoriesSaga } from './../bows/bow-model/child-components/bow-config-panel/accessories/bow-accessories-saga';
import { deleteBowAccessorySaga } from '../bows/bow-model/child-components/bow-model-page/bow-config/config-panel/child-components/accessories/assets/utils/bow-accessories-saga';

// import { obtainMainNavHeightSaga, getMainNavHeightSaga } from './../main-nav/main-nav-sagas';
import { fetchBowFamilySaga, clearBowFamilySaga } from '../bows/bow-model/assets/utilities/bow-family/bow-family-sagas';


import { fetchProductRecommendationsSaga } from '../add-to-cart-modal/child-components/product-recommendations/product-recommendations-sagas'

import {
  fetchCollectionByHandleSaga,
  clearCollectionSaga,
  fetchApparelCollectionsSaga,
  fetchAccessoriesCollectionsSaga,
  fetchFeaturedCollectionsSaga,
  fetchFilteredCollectionProductsSaga,
  clearFilteredCollectionProductsSaga
} from './../reusable/shopify/collection/collection-sagas'

import {
  fetchProductByHandleSaga,
  clearProductSaga
} from './../reusable/shopify/product/product-sagas';

import {
  fetchCreateCartSaga,
  fetchReplaceCartLineItemsSaga,
  fetchApplyDiscountCodeSaga,
  fetchRemoveDiscountCodeSaga,
  optimisticCartUpdateSaga,
  removeDiscountCodeErrorSaga
} from './../reusable/shopify/cart/cart-sagas';

export default function* rootSaga() {
  yield all([
    fetchBowFamilySaga(),
    fetchBowsSaga(),
    clearBowFamilySaga(),
    // fetchBowModelSaga(),
    setBowModelSaga(),
    setBowSkuSaga(),
    // clearBowModelSaga(),
    fetchRiserColorSaga(),
    setRiserColorSaga(),
    setLimbColorSaga(),
    setLengthSaga(),
    setWeightSaga(),
    setHandSaga(),
    setQuiverSaga(),
    setStabilizerSaga(),
    setRestSaga(),
    setSlingSaga(),
    setArrowSaga(),
    setBowCaseSaga(),
    setStepSummarySaga(),
    fetchStepSummarySaga(),
    fetchBuildSummarySaga(),
    fetchDealersSaga(),
    selectDealerSaga(),   
    fetchBowAccessoriesSaga(),
    deleteBowAccessorySaga(),
    // obtainMainNavHeightSaga(),
    // getMainNavHeightSaga(),

    fetchProductRecommendationsSaga(),

    fetchCreateCartSaga(),
    fetchReplaceCartLineItemsSaga(),
    fetchApplyDiscountCodeSaga(),
    fetchRemoveDiscountCodeSaga(),
    fetchProductByHandleSaga(),
    clearProductSaga(),
    fetchCollectionByHandleSaga(),
    clearCollectionSaga(),
    fetchApparelCollectionsSaga(),
    fetchAccessoriesCollectionsSaga(),
    fetchFeaturedCollectionsSaga(),
    optimisticCartUpdateSaga(),
    removeDiscountCodeErrorSaga(),
    fetchFilteredCollectionProductsSaga(),
    clearFilteredCollectionProductsSaga()
  ]);
};
