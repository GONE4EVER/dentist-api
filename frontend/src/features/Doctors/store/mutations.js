export const SET_FETCH_STATUS = (state, payload) => {
  state.fetching = payload;
};

export const SET_ERROR_STATE = (state, payload) => {
  state.error = payload;
};

export const SET_ITEMS_LIST = (state, payload) => {
  state.list = payload;
};

export const EDIT_ITEM = (state, payload) => {
  const { id } = payload;

  state.list = state.list
    .map(item => (item.id === id ? payload : item));
};
