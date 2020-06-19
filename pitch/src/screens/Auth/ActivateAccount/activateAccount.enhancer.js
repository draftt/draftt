import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapDispatchToProps = () => ({});
const mapStateToProps = (state) => ({
  uid: state.userInfo.uid,
  timestamp: state.userInfo.timestamp,
});

export default compose(connect(mapStateToProps, mapDispatchToProps));
