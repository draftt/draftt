import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import tcomb from 'tcomb-form-native';


// tcomb form library vars
const Form = tcomb.form.Form;

const login = tcomb.struct({
    email : tcomb.String,
    password : tcomb.String
});

const options = {
    auto : 'placeholders',
    fields : {
        email : {
            label : null,
        },
        password : {
            label : null
        }
    }
};


const LoginScreen = () => {

    return (
        <View style={styles.containerStyle}>

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

            </View>
        </View>
    );

};


const styles = StyleSheet.create({

    containerStyle : {
        flex : 1,
        alignItems : 'center',
        // borderWidth : 1
    },

    // Logo Styles

    logoContainerStyle : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        marginTop : 40
        // borderWidth : 1
    },
    
    logoStyle : {
        width : 150,
        height : 150
    },


    // Login Form Styles

    formStyle : {
        flex : 3,
        width : 350,
    },

    formHeaderStyle : {
        fontSize : 40,
        alignSelf : 'center',
        paddingBottom : 50
    },

    submitButtonStyle : {
        backgroundColor : '#fd7719',
        borderRadius : 5,
        padding : 10
    },

    submitButtonTextStyle : {
        fontSize : 20, 
        textAlign : 'center', 
        color:'white'
    },

    // Or text styling

    orTextStyle : {
        alignSelf : 'center', 
        fontSize : 20, 
        padding : 35,
    },

    // Other sign in option styling

    placeholderStyle : {
        borderWidth : 1,
        borderRadius : 5,
        padding : 15,
        margin : 10
    }

});


export default LoginScreen;