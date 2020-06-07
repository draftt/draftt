export const SET_STATUS = "SET_STATUS";
export function setStatus(status) {
	return { type: SET_STATUS, status };
}

export const SET_TOKEN = "SET_TOKEN";
export function setLoginToken(token) {
	return { type: SET_TOKEN, token };
}

export const SET_EMAIL = "SET_EMAIL";
export function setEmail(email) {
	return { type: SET_EMAIL, email };
}

export const SET_USERNAME = "SET_USERNAME";
export function setUsername(username) {
	return { type: SET_USERNAME, username };
}
