import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import tcomb from 'tcomb-form-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var _ = require('lodash');

// tcomb form library vars
const Form = tcomb.form.Form;
const stylesheet = _.cloneDeep(Form.stylesheet);

stylesheet.formGroup.normal.padding = wp(1);
stylesheet.textbox.normal.height = hp(6);

const login = tcomb.struct({
    email : tcomb.String,
    password : tcomb.String
});

const options = {
    auto : 'placeholders',
    fields : {
        email : {
            placeholder : 'Email / Username',
            label : null
        },
        password : {
            placeholder : 'Password',
            label : null,
            password : true,
            secureTextEntry: true
            
        }
    },
    stylesheet : stylesheet
};


const LoginScreen = () => {

    return (
        <KeyboardAvoidingView style={styles.containerStyle} behavior="padding" enabled>

            <View style={styles.logoContainerStyle}>
                <Image source={require('../../assets/logo/Logo_NoBG.png')} style={styles.logoStyle} />
            </View>

            <View style={styles.formStyle}>

                <Text style={styles.formHeaderStyle} >Login</Text>

                <Form type={login} options={options} />
                <TouchableOpacity style={styles.submitButtonStyle}>
                    <Text style={styles.submitButtonTextStyle}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.orTextStyle}> or </Text>
                

                <TouchableOpacity style={styles.placeholderStyle}>
                    <Text style={{textAlign : 'center'}}>Sign in with Google placeholder</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.placeholderStyle}>
                    <Text style={{textAlign : 'center'}}>Sign in with Facebook placeholder</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUpStyle}>
                    <Text style={{textAlign : 'center'}}>No Account? Sign up!</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );

};


const styles = StyleSheet.create({

    containerStyle : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#fefffe'
        // borderWidth : 1
    },

    // Logo Styles

    logoContainerStyle : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        marginTop : hp(5),
        width : wp('50%'),
        height : hp('50%'),
        // borderWidth : 1
    },
    
    logoStyle : {
        flex : 1,
        width : '100%' ,
        height : '100%',
        resizeMode : 'contain'
    },


    // Login Form Styles

    formStyle : {
        flex : 3,
        width : wp('80%'),
    },

    formHeaderStyle : {
        fontSize : hp('4%'),
        alignSelf : 'center',
        paddingBottom : hp('5%')
    },

    submitButtonStyle : {
        backgroundColor : '#fd7719',
        borderRadius : 5,
        padding : hp('1%')
    },

    submitButtonTextStyle : {
        fontSize : hp('2%'), 
        textAlign : 'center', 
        color:'white'
    },

    // Or text styling

    orTextStyle : {
        alignSelf : 'center', 
        fontSize : hp('2%'), 
        padding : hp('3.5%'),
    },

    // Other sign in option styling

    placeholderStyle : {
        borderWidth : 1,
        borderRadius : 5,
        padding : hp('1.5%'),
        margin : hp('1%')
    },

    signUpStyle : {
        borderRadius : 5,
        padding : hp('1.5%'),
        marginTop : hp('6%')
    }

});


export default LoginScreen;