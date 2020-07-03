import { hoistStatics } from 'recompose';
import Stats from './stats';
import enhance from './stats.enhancer';

export default hoistStatics(enhance)(Stats);
