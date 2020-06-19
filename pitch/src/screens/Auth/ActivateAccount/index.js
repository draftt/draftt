import { hoistStatics } from 'recompose';
import ActivateAccount from './activateAccount';
import enhancer from './activateAccount.enhancer';

export default hoistStatics(enhancer)(ActivateAccount);
