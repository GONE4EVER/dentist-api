export const GET_LIST = (state/* , getters */) => (/* search, date */) => state.list;

export const GET_FETCHING_STATE = (state) => state.fetching;

export const GET_ERROR_STATE = (state) => state.error;

export const GET_ONE = (state/* , getters */) => (searchedId) => state
  .list
  .find(({ id }) => {
    if (id === searchedId) {
      console.log(state.list);
    }

    return id === searchedId;
  });
