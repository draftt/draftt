import { hoistStatics } from 'recompose';
import Settings from './settings';
import enhance from './settings.enhancer';

export default hoistStatics(enhance)(Settings);
