import { createStackNavigator } from 'react-navigation-stack';
import Tester from 'screens/Tester';
import Signup from './Signup';
import Login from './Login';
import NewPassword from './NewPassword';
import ResetPassword from './ResetPassword';
import ActivateAccount from './ActivateAccount';

export default createStackNavigator(
  {
    Login,
    Signup,
    NewPassword,
    ResetPassword,
    ActivateAccount,
    Tester,
  },

  {
    initialRouteName: 'Tester',
    headerMode: 'none',
  },
);
