import Login from './login'
import enhance from './login.enhancer'
import {hoistStatics} from 'recompose'
export default hoistStatics(enhance)(Login);

