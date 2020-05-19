import setNamespace from 'utils/getNamespacedNames';

import baseActions from 'features/Patients/constants/actions';
import baseGetters from 'features/Patients/constants/getters';
import baseMutations from 'features/Patients/constants/mutations';


const PATIENTS_MODULE_PREFIX = 'patients';
const getNamespacedItems = setNamespace(PATIENTS_MODULE_PREFIX);

const actions = getNamespacedItems(baseActions);
const getters = getNamespacedItems(baseGetters);
const mutations = getNamespacedItems(baseMutations);


export {
  actions,
  getters,
  mutations,
};
