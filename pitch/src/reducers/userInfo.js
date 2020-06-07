import { SET_TOKEN, SET_EMAIL, SET_USERNAME } from "../actions";

const defaultState = {
	token: null,
	email: null,
	username: null,
};

export default function userInfo(state = defaultState, action) {
	console.log("In userinfo reducer");
	switch (action.type) {
		case SET_TOKEN:
			console.log("Set_Token case with token: " + action.token);
			return Object.assign({}, state, {
				token: action.token,
			});
		case SET_EMAIL:
			console.log("Set_Email case with token: " + action.email);
			return Object.assign({}, state, {
				email: action.email,
			});
		case SET_USERNAME:
			console.log("Set_Username case with token: " + action.username);
			return Object.assign({}, state, {
				username: action.username,
			});
		default:
			return state;
	}
}
