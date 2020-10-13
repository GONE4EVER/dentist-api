
import actions from 'features/Auth/store/constants/actions';
import getters from 'features/Auth/store/constants/getters';
import mutations from 'features/Auth/store/constants/mutations';
import setNamespace from 'utils/getNamespacedNames';


const AUTH_MODULE_PREFIX = 'auth';
const getNamespacedItems = setNamespace(AUTH_MODULE_PREFIX);

const namespacedActions = getNamespacedItems(actions);
const namespacedGetters = getNamespacedItems(getters);
const namespacedMutations = getNamespacedItems(mutations);


export {
  namespacedActions as actions,
  namespacedGetters as getters,
  namespacedMutations as mutations,
};
