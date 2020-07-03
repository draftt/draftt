import { hoistStatics } from 'recompose';
import Team from './team';
import enhance from './team.enhancer';

export default hoistStatics(enhance)(Team);
