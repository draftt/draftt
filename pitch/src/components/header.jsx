import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import Logo from 'components/logo';
import TeamLogo from 'assets/teamLogo.png';
import { AntDesign } from '@expo/vector-icons';

// Base header component
function HeaderBase({ left, center, right }) {
  return (
    <View style={styles.headerContainer}>
      <StatusBar />
      <View style={styles.left}>
        {left}
      </View>
      <View style={styles.center}>
        {center}
      </View>
      <View style={styles.right}>
        {right}
      </View>
    </View>
  );
}

export default function HeaderDefault() {
  return (
    <HeaderBase
      left={<Image source={TeamLogo} style={styles.teamLogoStyle} />}
      center={<Logo style={styles.teamLogoStyle} />}
      right={<AntDesign name="notification" size={20} color="grey" />}
    />
  );
}

const styles = StyleSheet.create({

  headerContainer: {
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
    overflow: 'visible',
  },
  left: {
    paddingVertical: 14,
    flex: 0.1,
  },
  center: {
    flex: 0.8,
  },
  right: {
    flex: 0.1,
    right: 0,
  },
  teamLogoStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
