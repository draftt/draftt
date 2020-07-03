import { hoistStatics } from 'recompose';
import Leagues from './leagues';
import enhance from './leagues.enhancer';

export default hoistStatics(enhance)(Leagues);
