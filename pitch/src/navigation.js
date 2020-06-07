import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "screens/Home";
import ScreenTester from "screens/Tester";
import LoginScreen from "screens/Auth/Login";
import SignupScreen from "screens/Auth/Signup";
import ResetPassword from "screens/Auth/ResetPassword";
import NewPassword from "screens/Auth/NewPassword";

const navigator = createStackNavigator(
	{
		// Routes
		Home: HomeScreen,
		Tester: ScreenTester,
		Login: LoginScreen,
		Signup: SignupScreen,
		ResetPassword: ResetPassword,
		NewPassword: NewPassword,
	},
	{
		// Stack navigator options
		initialRouteName: "Tester",
		defaultNavigationOptions: {
			title: "draftt", // displayed on the top
			header: null,
		},
	}
);

export default AppContainer = createAppContainer(navigator);
