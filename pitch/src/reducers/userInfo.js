import { SET_USER_INFO, SET_USER_ACTIVE } from "../actions";

const defaultState = {
	name: "",
	email: "",
	username: "",
	uid: "",
	timestamp: "",
};

export default function userInfo(state = defaultState, action) {
	let data = action.data;
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
