import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


/*
    This screen will have buttons to go to other screens to test them out.
    It will be default route for the stack navigator in App.js
*/

const ScreenTester = ({navigation}) => {

    const screens = ['Home', 'Login', 'Signup'];

    return (
        <View style={styles.container}>
            
            <View style={styles.logoContainerStyle}>
                <Image source={require("../../assets/logo/Logo_NoBG.png")} style={styles.logoStyle} />
            </View>
            

            <Text style={styles.titleStyle}>Tester Screen</Text>

            <FlatList
                keyExtractor={(screen) => {return screen;}}
                data={screens}
                renderItem={({item}) => {

                    return (
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress = {() => {navigation.navigate(item)}}
                        >
                            <Text style={{fontSize : 15, color : 'white'}}> Go to {item} Screen </Text>
                        </TouchableOpacity>
                    );

                }}
            />

        </View>
    );

};


const styles = StyleSheet.create({

    container : {
        backgroundColor : '#fefffe',
        flex : 1
    },

    titleStyle : {
        alignSelf : 'center',
        fontSize : 50,
        padding : hp(5)
    },

    buttonStyle : {
        backgroundColor : '#fd7719',
        borderRadius : 10,
        padding : hp(2),
        margin : hp(2)
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
        height : hp('30%'),
        alignSelf : 'center'
    }

});


export default ScreenTester;

