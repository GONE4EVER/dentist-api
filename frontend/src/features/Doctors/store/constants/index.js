import setNamespace from 'utils/getNamespacedNames';

import baseActions from 'features/Doctors/store/constants/actions';
import baseGetters from 'features/Doctors/store/constants/getters';
import baseMutations from 'features/Doctors/store/constants/mutations';


const PATIENTS_MODULE_PREFIX = 'doctors';
const getNamespacedItems = setNamespace(PATIENTS_MODULE_PREFIX);

const actions = getNamespacedItems(baseActions);
const getters = getNamespacedItems(baseGetters);
const mutations = getNamespacedItems(baseMutations);


export {
  actions,
  getters,
  mutations,
};
