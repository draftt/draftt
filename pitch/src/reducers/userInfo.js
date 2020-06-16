import { SET_USER_INFO, SET_USER_ACTIVE } from "../actions";

const defaultState = {
	name: "",
	email: "",
	username: "",
	isActive: false,
};

export default function userInfo(state = defaultState, action) {
	switch (action.type) {
		case SET_USER_INFO:
			const name = action.data.name;
			const email = action.data.email;
			const username = action.data.username;
			return {
				...state,
				name: name,
				email: email,
				username: username,
			};
		case SET_USER_ACTIVE:
			return {
				...state,
				isActive: true,
			};
		default:
			return state;
	}
}
