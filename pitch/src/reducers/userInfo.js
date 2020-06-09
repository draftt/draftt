import { SET_USER_INFO } from "../actions";

const defaultState = {
};

export default function userInfo(state = defaultState, action) {
	let data = action.data
	switch (action.type) {
		case SET_USER_INFO:
			return {
				...state,
				...data
			};
		// case SET_EMAIL:
		// 	console.log("Set_Email case with token: " + action.email);
		// 	return Object.assign({}, state, {
		// 		email: action.email,
		// 	});
		// case SET_USERNAME:
		// 	console.log("Set_Username case with token: " + action.username);
		// 	return Object.assign({}, state, {
		// 		username: action.username,
		// 	});
		default:
			return state;
	}
}
