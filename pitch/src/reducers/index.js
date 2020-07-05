import { combineReducers } from 'redux';
import pavilion from './pavilion';
import auth from './auth';
import userInfo from './user';

export default combineReducers({
  auth,
  pavilion,
  userInfo,
});
