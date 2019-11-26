export const STEP_SUMMARY_REQUESTED = 'STEP_SUMMARY_REQUESTED';
export const STEP_SUMMARY_SUCCEEDED = 'STEP_SUMMARY_SUCCEEDED';
export const STEP_SUMMARY_FAILED = 'STEP_SUMMARY_FAILED';

export const FETCH_STEP_SUMMARY_REQUESTED = 'FETCH_STEP_SUMMARY_REQUESTED';
export const FETCH_STEP_SUMMARY_SUCCEEDED = 'FETCH_STEP_SUMMARY_SUCCEEDED';
export const FETCH_STEP_SUMMARY_FAILED = 'FETCH_STEP_SUMMARY_FAILED';

export const setStepSummary = (summary) => {
  return {
    type: STEP_SUMMARY_REQUESTED,
    payload: summary
  };
}

export const fetchStepSummary = () => {
  return {
    type: FETCH_STEP_SUMMARY_REQUESTED
  };
}
