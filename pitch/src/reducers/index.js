import { combineReducers } from 'redux';
import pavilion from './pavilion';
import auth from './auth';
import user from './user';

export default combineReducers({
  auth,
  pavilion,
  user,
});
