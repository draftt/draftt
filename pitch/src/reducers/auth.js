import { SET_AUTH_TOKEN } from '../actions';

const defaultState = {
  isAuthenticated: false,
  access_token: '',
  expires_in: '',
  token_type: '',
  scope: '',
  refresh_token: '',
};

export default function auth(state = defaultState, action) {
  const { data } = action;
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
}
