
import { createStackNavigator} from 'react-navigation';
import SignUp from './Signup';
import Login from './Login';
import NewPassword from './NewPassword';
import ResetPassword from './ResetPassword';
import MainTabNavigator from './MainTabNavigator';


const AuthStack = createStackNavigator({ 
  Login,
  Signup,
  NewPassword,
  ResetPassword,
  Tester
},
{
  initialRouteName: 'Signup',
});