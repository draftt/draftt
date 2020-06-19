import { hoistStatics } from 'recompose';
import Login from './login';
import enhance from './login.enhancer';

export default hoistStatics(enhance)(Login);
