import Home from './home'
import enhance from './home.enhancer'
import {hoistStatics} from 'recompose'
export default hoistStatics(enhance)(Home);

