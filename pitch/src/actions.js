// SERVER STATUS
export const SET_STATUS = 'SET_STATUS';
export function setStatus(status) {
  return { type: SET_STATUS, status };
}

export const FETCH_STATUS = 'FETCH_STATUS';
export const fetchStatus = () => ({
  type: FETCH_STATUS,
});

// USER
export const SET_USER_INFO = 'SET_USER_INFO';
export function setUserInfo(userdata) {
  return { type: SET_USER_INFO, data: userdata };
}

// Login
export const LOGIN_USER = 'LOGIN_USER';
export function loginUser(userData, onSuccess, onFailure) {
  return { type: LOGIN_USER, data: userData, meta: { success: onSuccess, failure: onFailure } };
}

// Sign Up
export const SIGN_UP_USER = 'SIGN_UP_USER';
export function signUpUser(userData, onSuccess, onFailure) {
  return { type: SIGN_UP_USER, data: userData, meta: { success: onSuccess, failure: onFailure } };
}

// Verify User
export const VERIFY_USER = 'VERIFY_USER';
export function verifyUser(userData, onSuccess, onFailure) {
  return { type: VERIFY_USER, data: userData, meta: { success: onSuccess, failure: onFailure } };
}

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
