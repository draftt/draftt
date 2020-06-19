import React from 'react';
import { View, Image } from 'react-native';
import logoSrc from 'assets/nonamelogo/Logo_NoBG.png';
import globalStyles from '../styles/styles';

export default () => (
  <View style={globalStyles.logoContainer}>
    <Image
      source={logoSrc}
      style={globalStyles.logo}
    />
  </View>
);
