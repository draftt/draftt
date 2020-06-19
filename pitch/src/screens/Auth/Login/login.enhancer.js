import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setUserInfo } from 'src/actions';

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => {
    dispatch(setUserInfo(data));
  },
});
const mapStateToProps = (state) => ({
  token: state.userInfo.token,
  email: state.userInfo.email,
  username: state.userInfo.username,
});

export default compose(connect(mapStateToProps, mapDispatchToProps));
