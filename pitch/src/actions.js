// SERVER STATUS
export const SET_STATUS = 'SET_STATUS';
export function setStatus(status) {
  return { type: SET_STATUS, status };
}

export const FETCH_STATUS = 'FETCH_STATUS';
export const fetchStatus = () => ({
  type: FETCH_STATUS,
});

// USER AUTH
export const SET_USER_INFO = 'SET_USER_INFO';
export function setUserInfo(userdata) {
  return { type: SET_USER_INFO, data: userdata };
}

// SignUp
export const SIGN_UP_USER = 'SIGN_UP_USER';
export function signUpUser(userData, onSuccess, onFailure) {
  return { type: SIGN_UP_USER, data: userData, meta: { success: onSuccess, failure: onFailure } };
}
