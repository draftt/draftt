import { connect } from "react-redux";
import { compose } from "recompose";
import { setLoginToken, setEmail, setUsername } from "../../../actions";

const mapDispatchToProps = dispatch => {
	return {
		setToken: token => {
			dispatch(setLoginToken(token));
		},
		setEmail: email => {
			dispatch(setEmail(email));
		},
		setUsername: username => {
			dispatch(setUsername(username));
		},
	};
};
const mapStateToProps = state => {
	return {
		token: state.userInfo.token,
		email: state.userInfo.email,
		username: state.userInfo.username,
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps));
