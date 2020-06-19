import { hoistStatics } from 'recompose';
import Home from './home';
import enhance from './home.enhancer';

export default hoistStatics(enhance)(Home);
