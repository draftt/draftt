import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Status = ({ fetchStatus, status }) => {
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
    </View>
  );
};

const styles = StyleSheet.create({

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
export default Status;
