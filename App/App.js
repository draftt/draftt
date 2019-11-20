import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen'
import ScreenTester from './src/screens/ScreenTester';

const navigator = createStackNavigator(
	{
    // Routes
    Home : HomeScreen,
    Tester : ScreenTester
	},
	{
    // Stack navigator options
    initialRouteName: "Tester",
    defaultNavigationOptions: {
      title: "draftt" // displayed on the top 
    }
	}
);

export default createAppContainer(navigator);

