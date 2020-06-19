import { combineReducers } from 'redux';
import pavilionInfo from './pavilionInfo';
import userInfo from './userInfo';

export default combineReducers({
  pavilionInfo,
  userInfo,
});
