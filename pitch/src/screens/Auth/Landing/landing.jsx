import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Status from 'components/status';
import Logo from 'components/logo';

function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Status />
      <Logo showText style={{ height: '20%' }} />
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
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={{ color: 'white' }}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
});

export default Landing;
