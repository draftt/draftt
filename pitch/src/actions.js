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
export function setUserInfo(data) {
  return { type: SET_USER_INFO, data };
}
