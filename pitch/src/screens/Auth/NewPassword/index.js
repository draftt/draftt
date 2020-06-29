import { hoistStatics } from 'recompose';
import NewPassword from './newpassword';
import enhance from './newPassword.enhancer';

export default hoistStatics(enhance)(NewPassword);
