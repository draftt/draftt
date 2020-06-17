import { connect } from "react-redux";
import { compose } from "recompose";
import { setUserInfo } from "../../../actions";

const mapDispatchToProps = dispatch => {
	return {
		setUserInfo: data => {
			dispatch(setUserInfo(data));
		},
	};
};
const mapStateToProps = state => {
	return {};
};

export default compose(connect(mapStateToProps, mapDispatchToProps));
