import { connect } from "react-redux";
import { compose } from "recompose";
import { setUserInfo } from "src/actions";

const mapDispatchToProps = dispatch => {
	return {
		setUserInfo: data => {
			dispatch(setUserInfo(isActive));
		},
	};
};
const mapStateToProps = state => {
	return {
		token: state.userInfo.token,
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps));
