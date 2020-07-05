import React from 'react';
import { View, Image } from 'react-native';
import textLessLogo from 'assets/nonamelogo/Logo_NoBG.png';
import textLogo from 'assets/logo/Logo_NoBG.png';
import globalStyles from '../styles/styles';

export default ({ showText = false, style = {} }) => (
  <View style={[globalStyles.logoContainer, style]}>
    <Image
      source={showText ? textLogo : textLessLogo}
      style={globalStyles.logo}
    />
  </View>
);
