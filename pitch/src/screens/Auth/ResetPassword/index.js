import { hoistStatics } from 'recompose';
import ResetPassword from './resetpassword';
import enhance from './resetPassword.enhancer';

export default hoistStatics(enhance)(ResetPassword);
