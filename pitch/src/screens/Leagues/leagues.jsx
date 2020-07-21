import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logoSrc from 'assets/logo/Logo_NoBG.png';
import Header from 'components/header';

const Leagues = () => (
  <View style={styles.containerStyle}>
    <Header />
    <Text style={{
      padding: 10,
      color: '#fd7719',
      fontSize: 25,
    }}
    >
      Leagues Screen
    </Text>

    <View style={styles.listContainerStyle}>
      <View style={styles.bottomBorderStyle}>
        <Text style={styles.titleTextStyle}>Current</Text>
      </View>
      <View style={styles.bodyContainerStyle}>
        <Text style={{ color: 'white' }}>Current</Text>
      </View>
    </View>

    <View style={styles.listContainerStyle}>
      <View style={styles.bottomBorderStyle}>
        <Text style={styles.titleTextStyle}>Upcoming</Text>
      </View>
      <View style={styles.bodyContainerStyle}>
        <Text style={{ color: 'white' }}>Upcoming</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#061f26',
  },

  titleTextStyle: {
    padding: 5,
    color: '#fd7719',
    fontSize: 15,
  },

  logoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    width: wp('50%'),
    height: hp('50%'),
    // borderWidth : 1
  },

  logoStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  bottomBorderStyle: {
    borderBottomWidth: 5,
    borderBottomColor: '#334A52',
  },

  listContainerStyle: {
    width: '100%',
    flex: 1,
  },

  bodyContainerStyle: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
});

export default Leagues;
