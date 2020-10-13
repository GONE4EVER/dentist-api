export const GET_LIST = state => (/* search, date */) => state.list;

export const GET_FETCHING_STATE = state => state.fetching;

export const GET_ERROR_STATE = state => state.error;

export const GET_ONE = state => searchedId => state
  .list
  .find(({ id }) => id === searchedId);
