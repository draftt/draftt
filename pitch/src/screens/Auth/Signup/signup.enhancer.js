import { connect } from 'react-redux';
import { compose } from 'recompose';
import { signUpUser } from 'src/actions';

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (userInfo, onSuccess, onFailure) => {
    dispatch(signUpUser(userInfo, onSuccess, onFailure));
  },
});
const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps, mapDispatchToProps));
