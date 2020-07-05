import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Logo from 'components/logo';

/*
    This screen will have buttons to go to other screens to test them out.
    It will be default route for the stack navigator in App.js
*/

const Landing = ({ fetchStatus, status, navigation }) => {
  const iconStyle = status === 'Connected' ? styles.successIcon : styles.errorIcon;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.status}
        onPress={() => fetchStatus()}
      >
        <View style={styles.statusIcon}>
          {status === 'checking' ? (
            <ActivityIndicator size={10} color="#0000ff" />
          ) : (
            <View style={[styles.circle, iconStyle]} />
          )}
        </View>

        <Text style={{ fontFamily: 'monospace', color: 'white' }}>
          pavilion
        </Text>
      </TouchableOpacity>
      <Logo />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: 'white' }}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.lineStyle} />
          <Text style={{ color: 'white' }}> OR </Text>
          <View style={styles.lineStyle} />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: 'white' }}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#061f26',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  titleStyle: {
    alignSelf: 'center',
    fontSize: 50,
    padding: hp(5),
    color: 'white',
  },

  buttons: {
    marginTop: hp(25),
    alignContent: 'center',
    marginHorizontal: hp(5),
  },

  buttonStyle: {
    backgroundColor: '#fd7719',
    paddingVertical: hp(2),
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: hp(1),
    color: 'white',
  },

  lineStyle: {
    display: 'flex',
    borderWidth: 0.4,
    flex: 0.5,
    borderColor: 'white',
    margin: 10,
  },

  logoStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  logoContainerStyle: {
    marginTop: hp(10),
    width: wp('50%'),
    height: hp('30%'),
    alignSelf: 'center',
  },

  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    margin: hp(1),
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  errorIcon: {
    backgroundColor: 'red',
  },

  successIcon: {
    backgroundColor: 'green',
  },

  statusIcon: {
    alignSelf: 'center',
    marginRight: hp(1),
    marginTop: hp(0.5),
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'black',
  },
});
export default Landing;
