import { call, put, takeLatest, select } from 'redux-saga/effects';

import { fetchShopifyData } from '../api/fetchShopifyData';

import { 
  getCollectionByHandleWithProducts,
  getApparelCollectionsWithProducts,
  getAccessoriesCollectionsWithProducts,
  getFeaturedCollectionsWithProducts
} from './graphql';

import _find from 'lodash/find';

import {
  GET_COLLECTION_BY_HANDLE_REQUESTED,
  GET_COLLECTION_BY_HANDLE_SUCCEEDED,
  GET_COLLECTION_BY_HANDLE_FAILED,
  CLEAR_COLLECTION_REQUESTED,
  CLEAR_COLLECTION_SUCCEEDED,
  CLEAR_COLLECTION_FAILED,
  GET_APPAREL_COLLECTIONS_REQUESTED,
  GET_APPAREL_COLLECTIONS_SUCCEEDED,
  GET_APPAREL_COLLECTIONS_FAILED,
  GET_ACCESSORIES_COLLECTIONS_REQUESTED,
  GET_ACCESSORIES_COLLECTIONS_SUCCEEDED,
  GET_ACCESSORIES_COLLECTIONS_FAILED,
  GET_FEATURED_COLLECTIONS_REQUESTED,
  GET_FEATURED_COLLECTIONS_SUCCEEDED,
  GET_FEATURED_COLLECTIONS_FAILED,
  GET_FILTERED_COLLECTION_PRODUCTS_REQUESTED,
  GET_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED,
  GET_FILTERED_COLLECTION_PRODUCTS_FAILED,
  CLEAR_FILTERED_COLLECTION_PRODUCTS_REQUESTED,
  CLEAR_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED,
  CLEAR_FILTERED_COLLECTION_PRODUCTS_FAILED
} from './actions';

//fetch store collection with products using collection handle from shopify
export function* fetchCollectionByHandle({collectionHandle}) {
  try {

    const checkReduxForCollection = state => state.shopify.collection.list
    const collectionList = yield select(checkReduxForCollection)
    const match = collectionList.find(collection => { return collection.handle === collectionHandle })

    if(match) {
      
      const filteredProperty = { filteredProducts: null}
      const matchObject = {...match, ...filteredProperty}

      yield put({
        type: GET_COLLECTION_BY_HANDLE_SUCCEEDED,
        payload: matchObject
      });

    } else {

      const collection = yield call(fetchShopifyData, getCollectionByHandleWithProducts, collectionHandle);
      const collectionData = collection.data.collectionByHandle
  
      if (collectionData === null) {
        
        yield put({
          type: GET_COLLECTION_BY_HANDLE_FAILED
        });

      } else {
  
        const collectionObject = {
            id: collectionData.id,
            handle: collectionData.handle,
            title: collectionData.title,
            description: collectionData.description,
            image: collectionData.image,
            products: collectionData.products.edges.length > 0 ?  collectionData.products.edges.map(product => {
              return {
                id: product.node.id,
                handle: product.node.handle,
                title: product.node.title,
                tags: product.node.tags,
                availableForSale: product.node.availableForSale,
                description: product.node.description,
                descriptionHtml: product.node.descriptionHtml,
                priceRange: {
                  minVariantPrice: product.node.priceRange.minVariantPrice.amount,
                  maxVariantPrice: product.node.priceRange.minVariantPrice.amount
                },
                images: product.node.images.edges.length > 0 ? product.node.images.edges.map(image => { return image.node }) : [],
                options: product.node.options,
                variants: product.node.variants.edges.length > 0 ? product.node.variants.edges.map(variant => { 
                  return {
                    id: variant.node.id,
                    title: variant.node.title,
                    sku: variant.node.sku,
                    availableForSale: variant.node.availableForSale,
                    price: variant.node.priceV2.amount,
                    compareAtPrice: variant.node.compareAtPriceV2 !== null ? variant.node.compareAtPriceV2.amount : null,
                    image: variant.node.image,
                    selectedOptions: variant.node.selectedOptions
                  }
                }) : []
              }
            })
            : [],
            filteredProducts: null
        }
        // console.log('collection info from Shopify: ', collectionObject)
        yield put({
          type: GET_COLLECTION_BY_HANDLE_SUCCEEDED,
          payload: collectionObject
        });

      }
    }

  } catch (error) {
    console.log('error: ', error)
    yield put({
      type: GET_COLLECTION_BY_HANDLE_FAILED,
      payload: error
    });
  }
};

export function* fetchCollectionByHandleSaga() {
  yield takeLatest(GET_COLLECTION_BY_HANDLE_REQUESTED, fetchCollectionByHandle);
};

export function* clearCollection() {
  try {
    yield put({
      type: CLEAR_COLLECTION_SUCCEEDED,
      payload: {}
    });
  } catch (error) {
    yield put({
      type: CLEAR_COLLECTION_FAILED,
      payload: {}
    });
  }
};

export function* clearCollectionSaga() {
  yield takeLatest(CLEAR_COLLECTION_REQUESTED, clearCollection);
}

export function* fetchApparelCollections() {
  try {
    const apparelCollections = yield call(fetchShopifyData, getApparelCollectionsWithProducts);
    const apparelCollectionsData = apparelCollections.data.collections.edges
    const formattedApparelCollections = apparelCollectionsData.length > 0 ? apparelCollectionsData.map(collection => {
      return {
        id: collection.node.id,
        handle: collection.node.handle,
        title: collection.node.title,
        description: collection.node.description,
        image: collection.node.image,
        products: collection.node.products.edges.length > 0 ?  collection.node.products.edges.map(product => {
          return {
            id: product.node.id,
            handle: product.node.handle,
            title: product.node.title,
            tags: product.node.tags,
            availableForSale: product.node.availableForSale,
            description: product.node.description,
            descriptionHtml: product.node.descriptionHtml,
            priceRange: {
              minVariantPrice: product.node.priceRange.minVariantPrice.amount,
              maxVariantPrice: product.node.priceRange.minVariantPrice.amount
            },
            images: product.node.images.edges.length > 0 ? product.node.images.edges.map(image => { return image.node }) : [],
            options: product.node.options,
            variants: product.node.variants.edges.length > 0 ? product.node.variants.edges.map(variant => { 
              return {
                id: variant.node.id,
                title: variant.node.title,
                sku: variant.node.sku,
                availableForSale: variant.node.availableForSale,
                price: variant.node.priceV2.amount,
                compareAtPrice: variant.node.compareAtPriceV2 !== null ? variant.node.compareAtPriceV2.amount : null,
                image: variant.node.image,
                selectedOptions: variant.node.selectedOptions
              }
            }) : []
          }
        }) : []
      }
    }) : [];
    yield put({
      type: GET_APPAREL_COLLECTIONS_SUCCEEDED,
      payload:formattedApparelCollections
    });

  } catch (error) {
    console.log('error apparel collections with products:', error)
    yield put({
      type: GET_APPAREL_COLLECTIONS_FAILED,
      payload: error
    });
  }
};

export function* fetchApparelCollectionsSaga() {
  yield takeLatest(GET_APPAREL_COLLECTIONS_REQUESTED, fetchApparelCollections);
};

export function* fetchAccessoriesCollections() {
  try {
    const accessoriesCollections = yield call(fetchShopifyData, getAccessoriesCollectionsWithProducts);
    const accessoriesCollectionsData = accessoriesCollections.data.collections.edges
    const formattedAccessoriesCollections = accessoriesCollectionsData.length > 0 ? accessoriesCollectionsData.map(collection => {
      return {
        id: collection.node.id,
        handle: collection.node.handle,
        title: collection.node.title,
        description: collection.node.description,
        image: collection.node.image,
        products: collection.node.products.edges.length > 0 ?  collection.node.products.edges.map(product => {
          return {
            id: product.node.id,
            handle: product.node.handle,
            title: product.node.title,
            tags: product.node.tags,
            availableForSale: product.node.availableForSale,
            description: product.node.description,
            descriptionHtml: product.node.descriptionHtml,
            priceRange: {
              minVariantPrice: product.node.priceRange.minVariantPrice.amount,
              maxVariantPrice: product.node.priceRange.minVariantPrice.amount
            },
            images: product.node.images.edges.length > 0 ? product.node.images.edges.map(image => { return image.node }) : [],
            options: product.node.options,
            variants: product.node.variants.edges.length > 0 ? product.node.variants.edges.map(variant => { 
              return {
                id: variant.node.id,
                title: variant.node.title,
                sku: variant.node.sku,
                availableForSale: variant.node.availableForSale,
                price: variant.node.priceV2.amount,
                compareAtPrice: variant.node.compareAtPriceV2 !== null ? variant.node.compareAtPriceV2.amount : null,
                image: variant.node.image,
                selectedOptions: variant.node.selectedOptions
              }
            }) : []
          }
        }) : []
      }
    }) : [];
    yield put({
      type: GET_ACCESSORIES_COLLECTIONS_SUCCEEDED,
      payload:formattedAccessoriesCollections
    });

  } catch (error) {
    console.log('error accessories collections with products:', error)
    yield put({
      type: GET_ACCESSORIES_COLLECTIONS_FAILED,
      payload: error
    });
  }
};

export function* fetchAccessoriesCollectionsSaga() {
  yield takeLatest(GET_ACCESSORIES_COLLECTIONS_REQUESTED, fetchAccessoriesCollections);
};

export function* fetchFeaturedCollections() {
  try {
    const featuredCollections = yield call(fetchShopifyData, getFeaturedCollectionsWithProducts);
    const featuredCollectionsData = featuredCollections.data.collections.edges
    const formattedFeaturedCollections = featuredCollectionsData.length > 0 ? featuredCollectionsData.map(collection => {
      return {
        id: collection.node.id,
        handle: collection.node.handle,
        title: collection.node.title,
        description: collection.node.description,
        image: collection.node.image,
        products: collection.node.products.edges.length > 0 ?  collection.node.products.edges.map(product => {
          return {
            id: product.node.id,
            handle: product.node.handle,
            title: product.node.title,
            tags: product.node.tags,
            availableForSale: product.node.availableForSale,
            description: product.node.description,
            descriptionHtml: product.node.descriptionHtml,
            priceRange: {
              minVariantPrice: product.node.priceRange.minVariantPrice.amount,
              maxVariantPrice: product.node.priceRange.minVariantPrice.amount
            },
            images: product.node.images.edges.length > 0 ? product.node.images.edges.map(image => { return image.node }) : [],
            options: product.node.options,
            variants: product.node.variants.edges.length > 0 ? product.node.variants.edges.map(variant => { 
              return {
                id: variant.node.id,
                title: variant.node.title,
                sku: variant.node.sku,
                availableForSale: variant.node.availableForSale,
                price: variant.node.priceV2.amount,
                compareAtPrice: variant.node.compareAtPriceV2 !== null ? variant.node.compareAtPriceV2.amount : null,
                image: variant.node.image,
                selectedOptions: variant.node.selectedOptions
              }
            }) : []
          }
        }) : []
      }
    }) : [];
    yield put({
      type: GET_FEATURED_COLLECTIONS_SUCCEEDED,
      payload: formattedFeaturedCollections
    });

  } catch (error) {
    console.log('error featured collections with products:', error)
    yield put({
      type: GET_FEATURED_COLLECTIONS_FAILED,
      payload: error
    });
  }
};

export function* fetchFeaturedCollectionsSaga() {
  yield takeLatest(GET_FEATURED_COLLECTIONS_REQUESTED, fetchFeaturedCollections);
};

export function* fetchFilteredCollectionProducts({filteredProducts}) {
  try {
    yield put({
      type: GET_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED,
      payload: filteredProducts
    });
  } catch (error) {
    yield put({
      type: GET_FILTERED_COLLECTION_PRODUCTS_FAILED
    });
  }
};

export function* fetchFilteredCollectionProductsSaga() {
  yield takeLatest(GET_FILTERED_COLLECTION_PRODUCTS_REQUESTED, fetchFilteredCollectionProducts);
}

export function* clearFilteredCollectionProducts() {
  try {
    yield put({
      type: CLEAR_FILTERED_COLLECTION_PRODUCTS_SUCCEEDED
    });
  } catch (error) {
    yield put({
      type: CLEAR_FILTERED_COLLECTION_PRODUCTS_FAILED
    });
  }
};

export function* clearFilteredCollectionProductsSaga() {
  yield takeLatest(CLEAR_FILTERED_COLLECTION_PRODUCTS_REQUESTED, clearFilteredCollectionProducts);
}