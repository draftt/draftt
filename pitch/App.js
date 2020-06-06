import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/homescreen";
import ScreenTester from "./src/screens/screentester";
import LoginScreen from "./src/screens/login/loginscreen";
import SignupScreen from "./src/screens/login/signupscreen";
import ResetPassword from "./src/screens/login/resetpasswordscreen";
import NewPassword from "./src/screens/login/newpasswordscreen";

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
