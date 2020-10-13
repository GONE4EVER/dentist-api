export const GET_LIST = state => state.list;

export const GET_FETCHING_STATE = state => state.fetching;

export const GET_ERROR_STATE = state => state.error;

export const GET_ONE = state => id => state.list.find(d => d.id === id);
