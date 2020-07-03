import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const Settings = () => (
  <View style={styles.containerStyle}>
    <Text style={styles.titleTextStyle}>Settings Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fefffe',
  },
});

export default Settings;
