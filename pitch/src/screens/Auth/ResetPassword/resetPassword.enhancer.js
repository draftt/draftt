import { connect } from 'react-redux';
import { compose } from 'recompose';
import { resetPassword } from 'src/actions';

const mapDispatchToProps = (dispatch) => ({
  resetPwd: (userData, onSuccess, onFailure) => {
    dispatch(resetPassword(userData, onSuccess, onFailure));
  },
});

const mapStateToProps = () => ({

});

export default compose(connect(mapStateToProps, mapDispatchToProps));
