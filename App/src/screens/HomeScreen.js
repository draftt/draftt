import React from 'react';
import { View, Text, StyleSheet } from "react-native";


const HomeScreen = () => {

    return (
    <View style={styles.container}>
        <Text style={styles.titleTextStyle}>Home Screen</Text>
    </View>
    );

};


const styles = StyleSheet.create({
    
    container : {
        flex : 1,
        justifyContent : 'center'
    },
    
    titleTextStyle : {
        fontSize : 50,
        textAlign: 'center'
    }

});

export default HomeScreen;
