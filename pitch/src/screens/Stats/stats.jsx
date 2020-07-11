import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import Header from 'components/header';

const Stats = () => (
  <View style={styles.containerStyle}>
    <Header />
    <Text style={styles.titleTextStyle}>Stats Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fefffe',
  },
});

export default Stats;
