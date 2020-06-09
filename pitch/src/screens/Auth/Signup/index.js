import Signup from './signup'
import enhance from './signup.enhancer'
import {hoistStatics} from 'recompose'
export default hoistStatics(enhance)(Signup);

