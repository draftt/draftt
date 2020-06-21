import { connect } from 'react-redux';
import { compose } from 'recompose';
import { verifyUser } from 'src/actions';

const mapDispatchToProps = (dispatch) => ({
  verifyUser: (userData, onSuccess, onFailure) => {
    dispatch(verifyUser(userData, onSuccess, onFailure));
  },
});
const mapStateToProps = (state) => ({
  uid: state.userInfo.uid,
  timestamp: state.userInfo.timestamp,
});

export default compose(connect(mapStateToProps, mapDispatchToProps));
