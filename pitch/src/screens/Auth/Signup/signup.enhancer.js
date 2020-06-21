import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setUserInfo, signUpUser } from '../../../actions';

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (userInfo) => {
    dispatch(setUserInfo(userInfo));
  },
  signUpUser: (userInfo, onSuccess, onFailure) => {
    dispatch(signUpUser(userInfo, onSuccess, onFailure));
  },
});
const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps, mapDispatchToProps));
