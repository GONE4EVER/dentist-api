import setNamespace from 'utils/getNamespacedNames';

import baseActions from 'features/Patients/constants/actions';


const PATIENTS_MODULE_PREFIX = 'patients';
const getNamespacedItems = setNamespace(PATIENTS_MODULE_PREFIX);

const actions = getNamespacedItems(baseActions);

const getters = getNamespacedItems({
  GET_LIST: 'GET_LIST',
  GET_ONE: 'GET_ONE',
  GET_FETCHING_STATE: 'GET_FETCHING_STATE',
});

const mutations = {
  ADD_ITEM: 'ADD_ITEM',
  SET_ITEMS_LIST: 'SET_ITEMS_LIST',
  REMOVE_ITEM: 'REMOVE_ITEM',

  SET_FETCH_STATUS: 'SET_FETCH_STATUS',
  SET_ERROR_STATE: 'SET_ERROR_STATE',
};


export {
  actions,
  getters,
  mutations,
};
