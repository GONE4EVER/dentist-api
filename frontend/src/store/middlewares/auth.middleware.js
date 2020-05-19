import { actions as authActions } from 'features/Auth/store/constants';

export default (action, state) => {
  if (action.type !== authActions.AUTHENTICATE) {
    console.log(`before action ${action.type}`, state);
  }
};
