import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import ScreenTester from "./src/Screens/ScreenTester";
import LoginScreen from "./src/Screens/Login/LoginScreen";
import SignupScreen from "./src/Screens/Login/SignupScreen";
import ResetPassword from "./src/Screens/Login/ResetPasswordScreen";
import NewPassword from "./src/Screens/Login/NewPasswordScreen";

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
