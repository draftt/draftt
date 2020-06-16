import { createStackNavigator } from "react-navigation-stack";
import Signup from "./Signup";
import Login from "./Login";
import NewPassword from "./NewPassword";
import ResetPassword from "./ResetPassword";
import ActivateAccount from "./ActivateAccount";
import Tester from "screens/Tester";

export default OpenStack = createStackNavigator(
	{
		Login,
		Signup,
		NewPassword,
		ResetPassword,
		ActivateAccount,
		Tester,
	},

	{
		initialRouteName: "ActivateAccount",
		headerMode: "none",
	}
);
