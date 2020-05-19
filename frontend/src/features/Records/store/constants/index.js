import setNamespace from 'utils/getNamespacedNames';

import baseActions from 'features/Records/store/constants/actions';
import baseGetters from 'features/Records/store/constants/getters';
import baseMutations from 'features/Records/store/constants/mutations';


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
