import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import ScreenTester from "./screens/ScreenTester";
import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/login/SignupScreen";
import ResetPassword from "./screens/login/ResetPasswordScreen";
import NewPassword from "./screens/login/NewPasswordScreen";

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
