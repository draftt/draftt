import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/Home";
import ScreenTester from "./screens/Tester";
import LoginScreen from "./screens/login/loginscreen";
import SignupScreen from "./screens/login/signupscreen";
import ResetPassword from "./screens/login/resetpasswordscreen";
import NewPassword from "./screens/login/newpasswordscreen";

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
