import { SET_USER_INFO } from '../actions';

const defaultState = {
  name: '',
  email: '',
  username: '',
  uid: '',
  timestamp: '',
};

export default function userInfo(state = defaultState, action) {
  const { data } = action;
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
}
