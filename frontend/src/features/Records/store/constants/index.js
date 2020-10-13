
import actions from 'features/Records/store/constants/actions';
import getters from 'features/Records/store/constants/getters';
import mutations from 'features/Records/store/constants/mutations';
import setNamespace from 'utils/getNamespacedNames';


const RECORDS_MODULE_PREFIX = 'records';
const getNamespacedItems = setNamespace(RECORDS_MODULE_PREFIX);

const namespacedActions = getNamespacedItems(actions);
const namespacedGetters = getNamespacedItems(getters);
const namespacedMutations = getNamespacedItems(mutations);


export {
  namespacedActions as actions,
  namespacedGetters as getters,
  namespacedMutations as mutations,
};
