import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PublicStack from 'screens/Auth';
import HomeScreen from 'screens/Home';
import LeaguesScreen from 'screens/Leagues';
import TeamScreen from 'screens/Team';
import StatsScreen from 'screens/Stats';
import SettingsScreen from 'screens/Settings';

import {
  AntDesign, SimpleLineIcons, EvilIcons, MaterialCommunityIcons,
} from '@expo/vector-icons';

// Navigation stack declaration for routes only available when logged in
function ProtectedStack() {
  const Stack = createBottomTabNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBarOptions={{ showLabel: false, activeTintColor: '#fd7719' }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Leagues"
        component={LeaguesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Team"
        component={TeamScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{
              height: size * 3,
              width: size * 3,
              backgroundColor: focused ? color : '#3B5998',
              borderRadius: (size * 3) / 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: size / 2,

            }}
            >
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={size + 5}
                color="white"
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="barschart" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="gear" size={size} color={color} />
          ),
        }}
      />
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
  isAuthenticated: state.auth.isAuthenticated,
}))(AppContainer);
