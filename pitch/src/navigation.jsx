import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import PublicStack from 'screens/Auth';
import HomeScreen from 'screens/Home';

// Navigation stack declaration for routes only available when logged in
function ProtectedStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Returns routes based on the authentication status
// making oher routes inaccessible
function AppContainer({ isAuthenticated }) {
  if (isAuthenticated) return <ProtectedStack />;
  return <PublicStack />;
}

// Gets Authentication status from redux store
export default connect((state) => ({
  isAuthenticated: state.userInfo.isAuthenticated,
}))(AppContainer);
