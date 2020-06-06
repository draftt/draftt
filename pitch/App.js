import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ScreenTester from "./src/screens/ScreenTester";
import LoginScreen from "./src/screens/login/LoginScreen";
import SignupScreen from "./src/screens/login/SignupScreen";
import ResetPassword from "./src/screens/login/ResetPasswordScreen";
import NewPassword from "./src/screens/login/NewPasswordScreen";

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

export default createAppContainer(navigator);
