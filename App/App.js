import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const navigator = createStackNavigator(
	{
		// Routes
	},
	{
    // Stack navigator options
	}
);

export default createAppContainer(navigator);

