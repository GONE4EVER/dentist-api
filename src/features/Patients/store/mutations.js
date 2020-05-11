import Patient from 'entities/Patient.entity';


export const SET_FETCH_STATUS = (state, payload) => {
  state.fetching = payload;
};

export const SET_ERROR_STATE = (state, payload) => {
  state.error = payload;
};

export const SET_ITEMS_LIST = (state, payload) => {
  state.list = payload;
};

export const ADD_ITEM = (state, payload) => {
  console.log(state, payload);
};

export const EDIT_ITEM = (state, payload) => {
  const { id, targetProp, value } = payload;

  state.list = state
    .list
    .map((item) => (item.id === id
      ? new Patient({ ...item, [targetProp]: value })
      : item));
};

export const REMOVE_ITEM = (state, payload) => {
  console.log(state, payload);
};
