import { connect } from 'react-redux';
import { compose } from 'recompose';
import { loginUser } from 'src/actions';

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData, onSuccess, onFailure) => {
    dispatch(loginUser(userData, onSuccess, onFailure));
  },
});
const mapStateToProps = () => ({

});

export default compose(connect(mapStateToProps, mapDispatchToProps));
