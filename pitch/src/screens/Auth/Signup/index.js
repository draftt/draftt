import { hoistStatics } from 'recompose';
import Signup from './signup';
import enhance from './signup.enhancer';

export default hoistStatics(enhance)(Signup);
