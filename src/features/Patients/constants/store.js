import setNamespace from 'utils/getNamespacedNames';


const PATIENTS_MODULE_PREFIX = 'PATIENTS';
const getNamespacedItems = setNamespace(PATIENTS_MODULE_PREFIX);

const actions = getNamespacedItems({
  ADD_PATIENT: 'ADD_PATIENT',
  EDIT_PROFILE: 'UPDATE_ITEM',
  REMOVE_PATIENT: 'REMOVE_PATIENT',
});

const getters = getNamespacedItems({
  GET_LIST: 'GET_LIST',
  GET_ONE: 'GET_ONE',
});

const mutations = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
};


export {
  actions,
  getters,
  mutations,
};
