import {
  SET_BOW_MODEL_SUCCEEDED,
  SET_BOW_MODEL_FAILED,
  CLEAR_BOW_MODEL_SUCCEEDED,

  SET_BOW_SKU_REQUESTED,
  SET_BOW_SKU_SUCCEEDED,
  SET_BOW_SKU_FAILED
} from './bow-model-actions';

import {
  SET_RISER_COLOR_SUCCEEDED,
  SET_RISER_COLOR_FAILED,

  FETCH_RISER_COLOR_SUCCEEDED,
  FETCH_RISER_COLOR_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/riser-limb-finish/assets/utils/riser-actions';

import {
  SET_LIMB_COLOR_SUCCEEDED,
  SET_LIMB_COLOR_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/riser-limb-finish/assets/utils/limb-actions';

import {
  SET_LENGTH_SUCCEEDED,
  SET_LENGTH_FAILED,

  SET_WEIGHT_SUCCEEDED,
  SET_WEIGHT_FAILED,

  SET_HAND_SUCCEEDED,
  SET_HAND_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/specs/assets/utils/specs-actions';

import {
  SET_QUIVER_SUCCEEDED,
  SET_QUIVER_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/quiver/quiver-actions';

import {
  SET_STABILIZER_SUCCEEDED,
  SET_STABILIZER_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/stabilizer/stabilizer-actions';

import {
  SET_REST_SUCCEEDED,
  SET_REST_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/rest/rest-actions';

import {
  SET_SLING_SUCCEEDED,
  SET_SLING_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/sling/sling-actions';

import {
  SET_ARROW_SUCCEEDED,
  SET_ARROW_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/arrow/arrow-actions';

import {
  SET_BOWCASE_SUCCEEDED,
  SET_BOWCASE_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/child-components/bowcase/bowcase-actions';

import {
  FETCH_BUILD_SUMMARY_SUCCEEDED,
  FETCH_BUILD_SUMMARY_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/summary/build-summary-actions';

import {
  FETCH_STEP_SUMMARY_REQUESTED,
  FETCH_STEP_SUMMARY_SUCCEEDED,
  FETCH_STEP_SUMMARY_FAILED
} from './child-components/bow-model-page/bow-config/bow-view/step-summary/step-summary-actions';

import {
  DELETE_BOW_ACCESSORY_REQUESTED,
  DELETE_BOW_ACCESSORY_SUCCEEDED,
  DELETE_BOW_ACCESSORY_FAILED
} from './child-components/bow-model-page/bow-config/config-panel/child-components/accessories/assets/utils/bow-accessories-actions'

const initialState = {
  bowModel: {},
  bowSku: "",
  riserColor: "at",
  limbColor: "at",
  length: "",
  weight: "",
  hand: "right",
  accessories: {
    quivers: [],
    stabilizers: [],
    arrowRests: [],
    slings: [],
    arrows: [],
    bowCases: []
  }
};

function insertAccessoryItem(state, item, action) {
  let newArray = state.accessories[`${item}`].concat(action.payload);
  state.accessories[`${item}`] = newArray;
  return state.accessories[`${item}`];
}




function removeAccessoryItem(state, item, action) {

  let newAccessories = state.accessories[item].slice();

  // console.log('newAccessories ===', newAccessories);

  let matchingAccessory = newAccessories.find( accessory => {
    // console.log('accessory: ', accessory);
    if (accessory.node.id === Object.values(action.payload)[0].node.id) {
      return {node: accessory};
    }
  });

  let filteredAcc = newAccessories.filter(acc => {
    // console.log('matchingAccessory.node.id: ', matchingAccessory.node.id);
    // console.log('acc.node.id: ', acc.node.id);

    if (acc.node.id !== matchingAccessory.node.id) {
      return acc;
    }
  });

  state['accessories'][item] = filteredAcc;

  return state['accessories'][item];
}

const bowModelReducer = (state = initialState, action) => {
  switch (action.type) {

    // Selecting Bow

    case SET_BOW_MODEL_SUCCEEDED:
      state['bowModel'] = action.payload;
      return state;

    case SET_BOW_SKU_SUCCEEDED:
      state['bowSku'] = action.payload;
      return state;

    case SET_BOW_MODEL_FAILED:
      return action.payload.bowModel;

    case CLEAR_BOW_MODEL_SUCCEEDED:
      return action.payload.bowModel;

    // Selecting Riser colors
    case SET_RISER_COLOR_SUCCEEDED:
      state['riserColor'] = action.payload;
      return state;

    // Selecting Limb Colors
    case SET_LIMB_COLOR_SUCCEEDED:
      state['limbColor'] = action.payload;
      return state;

    // Selecting Length
    case SET_LENGTH_SUCCEEDED:
      state['length'] = action.payload;
      return state;

    // Selecting Weight
    case SET_WEIGHT_SUCCEEDED:
      state['weight'] = action.payload;
      return state;

    // Selecting Hand
    case SET_HAND_SUCCEEDED:
      state['hand'] = action.payload;
      return state;

    // Selecting Accessories
    case SET_QUIVER_SUCCEEDED:
      return {
        ...state,
        bowModel: {
          ...state.bowModel
        },
        accessories: {
          ...state.accessories,
          quivers: insertAccessoryItem(state, 'quivers', action)
        }
      }

    case SET_STABILIZER_SUCCEEDED:
      return {
        ...state,
        bowModel: {
          ...state.bowModel
        },
        accessories: {
          ...state.accessories,
          stabilizers: insertAccessoryItem(state, 'stabilizers', action)
        }
      }

    case SET_REST_SUCCEEDED:
      return {
        ...state,
        bowModel: {
          ...state.bowModel
        },
        accessories: {
          ...state.accessories,
          arrowRests: insertAccessoryItem(state, 'arrowRests', action)
        }
      }

    case SET_SLING_SUCCEEDED:
      return {
        ...state,
        bowModel: {
          ...state.bowModel
        },
        accessories: {
          ...state.accessories,
          slings: insertAccessoryItem(state, 'slings', action)
        }
      }

    case SET_ARROW_SUCCEEDED:
      return {
        ...state,
        bowModel: {
          ...state.bowModel
        },
        accessories: {
          ...state.accessories,
          arrows: insertAccessoryItem(state, 'arrows', action)
        }
      }

    case SET_BOWCASE_SUCCEEDED:
      return {
        ...state,
        bowModel: {
          ...state.bowModel
        },
        accessories: {
          ...state.accessories,
          bowCases: insertAccessoryItem(state, 'bowCases', action)
        }
      }

      case DELETE_BOW_ACCESSORY_REQUESTED:
      //  console.log('action.payload in reducer: ', action.payload);
       // console.log('state.accessories: ', state.accessories);
       // console.log('Object.keys(action.payload)[0]', Object.keys(action.payload)[0]);
      //  console.log('GENERAL STATE: ', state['accessories']);
      //  console.log('Specific array: ', state['accessories'][Object.keys(action.payload)[0]] );

      //  console.log('result of removeAccessoryItem ====> ', removeAccessoryItem(state, Object.keys(action.payload)[0], action))

      // state['accessories'][Object.keys(action.payload)[0]] = removeAccessoryItem(state, Object.keys(action.payload)[0], action);
      return {
        ...state,
        bowModel: {
          ...state.bowModel
        },
        accessories: {
          ...state.accessories,
          ...state.accessories[`${Object.keys(action.payload)[0]}`] = removeAccessoryItem(state, Object.keys(action.payload)[0], action)
        }
      };

      case DELETE_BOW_ACCESSORY_SUCCEEDED:
      // console.log('delete bow access succeeded!!!!!!!!!!!!!');
        return state;

    // Build Summary

    case FETCH_BUILD_SUMMARY_SUCCEEDED:
      return { ...state };

    default:
      return initialState;
  }
};

export default bowModelReducer;
