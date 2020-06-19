import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from 'screens/Home';
import OpenStack from 'screens/Auth/authnavigator';

const AuthenticatedStack = createStackNavigator(
  {
    // Routes
    Home: HomeScreen,
  },
  {
    // Stack navigator options
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      title: 'draftt', // displayed on the top
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Open: OpenStack,
      AuthenticatedStack,
    },
    {
      initialRouteName: 'Open',
      defaultNavigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
  ),
);
