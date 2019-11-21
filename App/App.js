import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ScreenTester from './src/screens/ScreenTester';
import LoginScreen from './src/screens/LoginScreen';

const navigator = createStackNavigator(
	{
    // Routes
    Home : HomeScreen,
    Tester : ScreenTester,
    Login : LoginScreen
	},
	{
    // Stack navigator options
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title : "draftt", // displayed on the top
      header : null
    }
	}
);

export default createAppContainer(navigator);

