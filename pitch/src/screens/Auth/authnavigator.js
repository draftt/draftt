
import { createStackNavigator} from 'react-navigation-stack';
import Signup from './Signup';
import Login from './Login';
import NewPassword from './NewPassword';
import ResetPassword from './ResetPassword';
import Tester from 'screens/Tester'


export default OpenStack = createStackNavigator({ 
  Login,
  Signup,
  NewPassword,
  ResetPassword,
  Tester
},

{
  initialRouteName: 'Tester',
  headerMode: 'none'
});