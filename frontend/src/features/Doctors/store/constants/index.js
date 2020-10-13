
import actions from 'features/Doctors/store/constants/actions';
import getters from 'features/Doctors/store/constants/getters';
import mutations from 'features/Doctors/store/constants/mutations';
import setNamespace from 'utils/getNamespacedNames';


const DOCTORS_MODULE_PREFIX = 'doctors';
const getNamespacedItems = setNamespace(DOCTORS_MODULE_PREFIX);

const namespacedActions = getNamespacedItems(actions);
const namespacedGetters = getNamespacedItems(getters);
const namespacedMutations = getNamespacedItems(mutations);


export {
  namespacedActions as actions,
  namespacedGetters as getters,
  namespacedMutations as mutations,
};
