
import actions from 'features/Patients/store/constants/actions';
import getters from 'features/Patients/store/constants/getters';
import mutations from 'features/Patients/store/constants/mutations';
import setNamespace from 'utils/getNamespacedNames';


const PATIENTS_MODULE_PREFIX = 'patients';
const getNamespacedItems = setNamespace(PATIENTS_MODULE_PREFIX);

const namespacedActions = getNamespacedItems(actions);
const namespacedGetters = getNamespacedItems(getters);
const namespacedMutations = getNamespacedItems(mutations);


export {
  namespacedActions as actions,
  namespacedGetters as getters,
  namespacedMutations as mutations,
};
