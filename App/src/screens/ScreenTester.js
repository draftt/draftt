import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


/*
    This screen will have buttons to go to other screens to test them out.
    It will be default route for the stack navigator in App.js
*/

const ScreenTester = ({navigation}) => {

    return (
        <View style={styles.container}>
            
            <View style={styles.logoContainerStyle}>
                <Image source={require("../../assets/logo/Logo_NoBG.png")} style={styles.logoStyle} />
            </View>
            

            <Text style={styles.titleStyle}>Tester Screen</Text>

            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress = {() => {navigation.navigate('Home')}}
            >
                <Text style={{fontSize : 15, color : 'white'}}> Go to Home Screen </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress = {() => {navigation.navigate('Login')}}
            >
                <Text style={{fontSize : 15, color : 'white'}}> Go to Login Screen </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress = {() => {navigation.navigate('Signup')}}
            >
                <Text style={{fontSize : 15, color : 'white'}}> Go to Signup Screen </Text>
            </TouchableOpacity>

        </View>
    );

};


const styles = StyleSheet.create({

    container : {
        alignItems : 'center',
        backgroundColor : '#fefffe'
    },

    titleStyle : {
        fontSize : 50,
        padding : 50
    },

    buttonStyle : {
        backgroundColor : '#fd7719',
        borderRadius : 10,
        padding : 20,
        margin : 20
    },

    logoStyle : {
        flex : 1,
        width : '100%' ,
        height : '100%',
        resizeMode : 'contain'
    },
    
    logoContainerStyle : {
        marginTop : hp(10),
        width : wp('50%'),
        height : hp('30%')
    }

});


export default ScreenTester;

