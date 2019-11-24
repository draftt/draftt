import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ScreenTester from './src/screens/ScreenTester';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ResetPassword from './src/screens/ResetPassword';

const navigator = createStackNavigator(
	{
    // Routes
    Home : HomeScreen,
    Tester : ScreenTester,
    Login : LoginScreen,
    Signup : SignupScreen,
    ResetPassword : ResetPassword
	},
	{
    // Stack navigator options
    initialRouteName: "Tester",
    defaultNavigationOptions: {
      title : "draftt", // displayed on the top
      header : null
    }
	}
);

export default createAppContainer(navigator);

