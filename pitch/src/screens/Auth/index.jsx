import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import Login from './Login';
import NewPassword from './NewPassword';
import ResetPassword from './ResetPassword';
import ActivateAccount from './ActivateAccount';
import Landing from './Landing';
// Nav stack declaration for open routes
export default function PublicStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Landing" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ActivateAccount" component={ActivateAccount} />
      <Stack.Screen name="Landing" component={Landing} />
    </Stack.Navigator>
  );
}
