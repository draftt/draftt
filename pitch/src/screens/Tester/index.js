import Tester from './tester'
import enhance from './tester.enhancer'
import {hoistStatics} from 'recompose'

export default hoistStatics(enhance)(Tester);

