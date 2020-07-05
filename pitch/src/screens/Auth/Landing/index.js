import { hoistStatics } from 'recompose';
import Landing from './landing';
import enhance from './landing.enhancer';

export default hoistStatics(enhance)(Landing);
