import { hoistStatics } from 'recompose';
import Tester from './tester';
import enhance from './tester.enhancer';

export default hoistStatics(enhance)(Tester);
