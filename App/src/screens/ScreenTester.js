import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


/*
    This screen will have buttons to go to other screens to test them out.
    It will be default route for the stack navigator in App.js
*/

const ScreenTester = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>Tester Screen</Text>

            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress = {() => {navigation.navigate('Home')}}
            >
                <Text style={{fontSize : 15, color : 'white'}}> Go to Home Screen </Text>
            </TouchableOpacity>

        </View>
    );

};


const styles = StyleSheet.create({

    container : {
        alignItems : 'center'
    },

    titleStyle : {
        fontSize : 50,
        padding : 50
    },

    buttonStyle : {
        backgroundColor : 'red',
        borderRadius : 10,
        padding : 20,
        margin : 20
    }

});


export default ScreenTester;

