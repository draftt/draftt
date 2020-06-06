import React, { useState } from "react";
import {
	ActivityIndicator,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
	StatusBar,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import userApi from "../api/user";

/*
    This screen will have buttons to go to other screens to test them out.
    It will be default route for the stack navigator in App.js
*/

// Status check functions
const statusCheck = async setStatus => {
	const delay = ms => new Promise(res => setTimeout(res, ms));
	await delay(1500);
	userApi
		.get("/status", { timeout: 1000 })
		.then(res => {
			setStatus(res.data);
		})
		.catch(error => {
			setStatus("error");
		});
};

const onStatusPress = async setStatus => {
	setStatus("checking");
	statusCheck(setStatus);
};

const ScreenTester = ({ navigation }) => {
	const [status, setStatus] = useState("checking");
	const screens = ["Home", "Login", "Signup", "ResetPassword", "NewPassword"];
	statusCheck(setStatus);
	let iconStyle =
		status === "Connected" ? styles.successIcon : styles.errorIcon;
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.status}
				onPress={() => onStatusPress(setStatus)}>
				<View style={styles.statusIcon}>
					{status === "checking" ? (
						<ActivityIndicator size={10} color='#0000ff' />
					) : (
						<View style={[styles.circle, iconStyle]}></View>
					)}
				</View>

				<Text style={{ fontFamily: "monospace" }}>pavilion</Text>
			</TouchableOpacity>
			<View style={styles.logoContainerStyle}>
				<Image
					source={require("../../assets/logo/Logo_NoBG.png")}
					style={styles.logoStyle}
				/>
			</View>

			<Text style={styles.titleStyle}>Tester Screen</Text>

			<FlatList
				keyExtractor={screen => {
					return screen;
				}}
				data={screens}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={styles.buttonStyle}
							onPress={() => {
								navigation.navigate(item);
							}}>
							<Text style={{ fontSize: 15, color: "white" }}>
								{" "}
								Go to {item} Screen{" "}
							</Text>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fefffe",
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},

	titleStyle: {
		alignSelf: "center",
		fontSize: 50,
		padding: hp(5),
	},

	buttonStyle: {
		backgroundColor: "#fd7719",
		borderRadius: 10,
		padding: hp(2),
		margin: hp(2),
		color: "black",
	},

	logoStyle: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},

	logoContainerStyle: {
		marginTop: hp(10),
		width: wp("50%"),
		height: hp("30%"),
		alignSelf: "center",
	},

	status: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignSelf: "flex-end",
		margin: hp(1),
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 10,
	},

	errorIcon: {
		backgroundColor: "red",
	},

	successIcon: {
		backgroundColor: "green",
	},

	statusIcon: {
		alignSelf: "center",
		marginRight: hp(1),
		marginTop: hp(0.5),
	},

	circle: {
		width: 10,
		height: 10,
		borderRadius: 10 / 2,
		backgroundColor: "black",
	},
});

export default ScreenTester;
