import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";


const HomeScreen = () => {

    return (
    <View style={styles.containerStyle}>
        <View style={styles.logoContainerStyle}>
            <Image source={require("../../assets/logo/Logo_NoBG.png")} style={styles.logoStyle} />
        </View>
        <Text style={styles.titleTextStyle}>Home Screen</Text>
    </View>
    );

};


const styles = StyleSheet.create({
    
    containerStyle : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#fefffe'
    },
    
    titleTextStyle : {
        flex : 1,
        fontSize : 30
    },


    logoContainerStyle : {
        flex : 1,
        justifyContent : "center",
        width : 150,
        height : 150
        // borderWidth : 1
    },
    
    logoStyle : {
        flex : 1,
        width : '100%' ,
        height : '100%',
        resizeMode : 'contain'
    },

});

export default HomeScreen;
