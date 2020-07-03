import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PublicStack from 'screens/Auth';
import HomeScreen from 'screens/Home';
import LeaguesScreen from 'screens/Leagues';
import TeamScreen from 'screens/Team';
import StatsScreen from 'screens/Stats';
import SettingsScreen from 'screens/Settings';

// Navigation stack declaration for routes only available when logged in
function ProtectedStack() {
  const Stack = createBottomTabNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Leagues" component={LeaguesScreen} />
      <Stack.Screen name="Team" component={TeamScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
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
