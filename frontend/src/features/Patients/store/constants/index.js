import setNamespace from 'utils/getNamespacedNames';

import baseActions from 'features/Patients/store/constants/actions';
import baseGetters from 'features/Patients/store/constants/getters';
import baseMutations from 'features/Patients/store/constants/mutations';


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
