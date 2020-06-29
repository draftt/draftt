import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setNewPassword } from 'src/actions';

const mapDispatchToProps = (dispatch) => ({
  setNewPwd: (userData, onSuccess, onFailure) => {
    dispatch(setNewPassword(userData, onSuccess, onFailure));
  },
});

const mapStateToProps = (state) => ({
  uid: state.userInfo.uid,
  timestamp: state.userInfo.timestamp,
});

export default compose(connect(mapStateToProps, mapDispatchToProps));
