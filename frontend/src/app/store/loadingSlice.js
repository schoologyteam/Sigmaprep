import { createSelector } from 'reselect';

const LOADING_START = 'app/store/LOADING_START';
const LOADING_STOP = 'app/store/LOADING_STOP';

export function startLoading(componentsName) {
  return {
    type: LOADING_START,
    payload: componentsName,
  };
}

export function stopLoading(componentsName) {
  return {
    type: LOADING_STOP,
    payload: componentsName,
  };
}

const DEFAULT_STATE = {
  loadingComps: {},
};

export default function loadingReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, loadingComps: { ...state.loadingComps, [action.payload]: true } };
    case LOADING_STOP:
      return { ...state, loadingComps: { ...state.loadingComps, [action.payload]: false } };
    default:
      return state;
  }
}

export const selectLoadingState = createSelector(
  (state) => state,
  function (state) {
    return { loadingComps: state.loading.loadingComps };
  },
);
