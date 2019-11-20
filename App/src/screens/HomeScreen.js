import React from 'react';
import { View, Text, StyleSheet } from "react-native";


const HomeScreen = () => {

    return (
    <View style={styles.container}>
        <Text style={styles.titleTextStyle}>draftt</Text>
        <Text style={styles.subTitleTextStyle}>Home Screen</Text>
    </View>
    );

};


const styles = StyleSheet.create({
    
    container : {
        flex : 1,
        alignItems : 'center'
    },
    
    titleTextStyle : {
        flex : 1,
        fontSize : 50,
        textAlignVertical : 'center'
    },

    subTitleTextStyle : {
        flex : 3,
        fontSize : 30
    }

});

export default HomeScreen;
