export const SELECTED_DEALER_REQUESTED = 'SELECTED_DEALER_REQUESTED';
export const SELECTED_DEALER_SUCCEEDED = 'SELECTED_DEALER_SUCCEEDED';
export const SELECTED_DEALER_FAILED = 'SELECTED_DEALER_FAILED';

export const SELECT_DEALER_REQUESTED = 'SELECT_DEALER_REQUESTED';
export const SELECT_DEALER_SUCCEEDED = 'SELECT_DEALER_SUCCEEDED';
export const SELECT_DEALER_FAILED = 'SELECT_DEALER_FAILED';

export const selectDealer = (selectedDealer) => {
  return {
    type: SELECT_DEALER_REQUESTED,
    payload: selectedDealer
  };
};

export const receiveSelectDealer = (payload) => {
  return {
    type: SELECT_DEALER_SUCCEEDED,
    payload: selectedDealer
  }
};


export const fetchSelectedDealer = () => {
  return {
    type: SELECTED_DEALER_REQUESTED,
    payload
  }
}

export const receiveSelectedDealer = (payload) => {
  return {
    type: SELECTED_DEALER_SUCCEEDED,
    payload
  };
}
