import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setUserInfo } from '../../../actions';

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data, onSuccess) => {
    console.log('In signup enhancer, about to dispatch action');
    // TODO: receive and pass an onError callback
    dispatch(setUserInfo(data, onSuccess));
  },
});
const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps, mapDispatchToProps));
