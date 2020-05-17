import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons'




const ResetPassword = ({navigation}) => {

    return (
        <View style={styles.containerStyle}>

            <View style={styles.logoContainerStyle}>
                <Image source={require('../../assets/logo/Logo_NoBG.png')} style={styles.logoStyle} />
            </View>

            <Text style={styles.titleStyle}>Reset Password Screen</Text>

            <View style={styles.resetContainerStyle}>

                <Text style={styles.resetTextStyle}>Enter Email Address to reset password:</Text>

                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Search"
                    style={styles.inputStyle}                
                    onChangeText={(newTerm) => {} }
                    onEndEditing={() => {}}
                />

            </View>

            <View style={styles.arrowContainerStyle}>

                <TouchableOpacity style={styles.arrowButtonStyle} onPress={() => {navigation.navigate('Login')}}>
                    <AntDesign name="arrowleft" size={40} color="#fefffe" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.arrowButtonStyle} onPress={() => {navigation.navigate('NewPassword')}}>
                    <AntDesign name="arrowright" size={40} color="#fefffe" />
                </TouchableOpacity>

            </View>
            
        </View>
    );

};


const styles = StyleSheet.create({

    containerStyle : {
        flex : 1,
        backgroundColor : '#fefffe',
        justifyContent : 'flex-start'
    },

    logoContainerStyle : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        width : wp('50%'),
        height : hp('35%'),
        alignSelf : 'center',
        paddingTop : hp(10)
        // borderWidth : 1
    },

    logoStyle : {
        flex : 1,
        width : '100%' ,
        height : '100%',
        resizeMode : 'contain'
    },
    
    titleStyle : {
        // flex : 1,
        fontSize : hp(3),
        alignSelf : 'center',
        padding : hp(5),
        // borderWidth : 1
    },

    resetContainerStyle : {
        flex : 1,
        paddingHorizontal : wp(2),
    },

    resetTextStyle : {
        fontSize : hp(2),        
        paddingTop : hp(3),
        paddingBottom : hp(1)

    },

    inputStyle : {
        // flex : 1,
        borderWidth : 1,
        padding : hp(1)
    },

    arrowContainerStyle : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : wp(4)
    },

    arrowButtonStyle : {
        backgroundColor : '#fd7719',
        borderRadius : 100,
        width : wp(15),
        height : wp(15),
        alignItems : 'center',
        justifyContent : 'center'
    }

});


export default ResetPassword;