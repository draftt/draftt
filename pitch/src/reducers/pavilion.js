import { SET_STATUS, FETCH_STATUS } from '../actions';

const defaultState = {
  link: [],
  status: 'checking',
};

export default function pavilion(state = defaultState, action) {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case FETCH_STATUS:
      return {
        ...state,
        status: 'checking',
      };
    default:
      return state;
  }
}
