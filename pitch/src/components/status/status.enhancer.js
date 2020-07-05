import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import { fetchStatus } from 'src/actions';

const mapDispatchToProps = (dispatch) => ({
  fetchStatus: () => {
    dispatch(fetchStatus());
  },
});
const mapStateToProps = (state) => ({
  status: state.pavilion.status,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // Fetch repos and select lang on mount
      this.props.fetchStatus();
    },
  }),
);
