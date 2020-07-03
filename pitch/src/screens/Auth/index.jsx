import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tester from 'screens/Tester';
import Signup from './Signup';
import Login from './Login';
import NewPassword from './NewPassword';
import ResetPassword from './ResetPassword';
import ActivateAccount from './ActivateAccount';

// Nav stack declaration for open routes
export default function PublicStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Tester" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ActivateAccount" component={ActivateAccount} />
      <Stack.Screen name="Tester" component={Tester} />
    </Stack.Navigator>
  );
}
