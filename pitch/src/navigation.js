import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/HomeScreen";
import ScreenTester from "./Screens/ScreenTester";
import LoginScreen from "./Screens/Login/LoginScreen";
import SignupScreen from "./Screens/Login/SignupScreen";
import ResetPassword from "./Screens/Login/ResetPasswordScreen";
import NewPassword from "./Screens/Login/NewPasswordScreen";

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
