import { mutations } from 'features/Patients/constants/store';


// TODO: api calls
export const ADD_PATIENT = (context, payload) => {
  context.commit(mutations.ADD_ITEM, payload);
};

export const REMOVE_PATIENT = (context, payload) => {
  context.commit(mutations.REMOVE_ITEM, payload);
};
