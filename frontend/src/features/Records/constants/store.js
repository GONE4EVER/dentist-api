import setNamespace from 'utils/getNamespacedNames';

import baseActions from 'features/Records/constants/actions';
import baseGetters from 'features/Records/constants/getters';
import baseMutations from 'features/Records/constants/mutations';


const RECORDS_MODULE_PREFIX = 'records';
const getNamespacedItems = setNamespace(RECORDS_MODULE_PREFIX);

const actions = getNamespacedItems(baseActions);
const getters = getNamespacedItems(baseGetters);
const mutations = getNamespacedItems(baseMutations);


export {
  actions,
  getters,
  mutations,
};
