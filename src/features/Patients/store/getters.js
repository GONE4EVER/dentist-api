export const GET_LIST = (state/* , getters */) => (/* search, date */) => state.list;

export const GET_FETCHING_STATE = (state) => state.fetching;

export const GET_ONE = (state/* , getters */) => (searchedId) => state
  .list
  .find(({ id }) => id === searchedId);
