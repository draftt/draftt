import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import pslLogo from 'assets/leagues/logo_psl.png';
import iplLogo from 'assets/leagues/logo_ipl.png';
import worldCupLogo from 'assets/leagues/logo_worldCup.png';
import Header from 'components/header';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

        <TouchableOpacity style={{
          flexDirection: 'row', margin: 10, backgroundColor: '#092c36', alignItems: 'center', height: hp('15%'),
        }}
        >
          <View style={styles.logoContainerStyle}>
            <Image source={pslLogo} style={styles.logoStyle} />
          </View>
          <View style={{
            flex: 2, flexDirection: 'column', justifyContent: 'center', padding: 15, margin: 10,
          }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>Pakistan Super League</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
          flexDirection: 'row', margin: 10, backgroundColor: '#092c36', alignItems: 'center', height: hp('15%'),
        }}
        >
          <View style={styles.logoContainerStyle}>
            <Image source={worldCupLogo} style={styles.logoStyle} />
          </View>
          <View style={{
            flex: 2, flexDirection: 'column', justifyContent: 'center', padding: 15, margin: 10,
          }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>ICC World Cup</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>

    <View style={styles.listContainerStyle}>
      <View style={styles.bottomBorderStyle}>
        <Text style={styles.titleTextStyle}>Upcoming</Text>
      </View>
      <View style={styles.bodyContainerStyle}>
        <TouchableOpacity style={{
          flexDirection: 'row', margin: 10, backgroundColor: '#092c36', alignItems: 'center', height: hp('15%'),
        }}
        >
          <View style={styles.logoContainerStyle}>
            <Image source={iplLogo} style={styles.logoStyle} />
          </View>
          <View style={{
            flex: 2, flexDirection: 'column', justifyContent: 'center', padding: 15, margin: 10,
          }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>Indian Premier League</Text>
          </View>
        </TouchableOpacity>
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
    height: '85%',
    alignItems: 'center',
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
    flexDirection: 'column',
    flex: 1,
  },
});

export default Leagues;
