import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setUserInfo } from '../../../actions';

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => {
    dispatch(setUserInfo(data));
  },
});
const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps, mapDispatchToProps));
