
import { connect } from 'react-redux';
import {compose} from 'recompose';
import {setStatus} from '../../actions';

const mapDispatchToProps = dispatch  =>{
	return { 
	    setStatus: (status) => { 
		dispatch (setStatus(status))
	    }
}
}; 
const mapStateToProps = (state)=>{
	return{
		status: state.pavilionInfo.status
	}
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)