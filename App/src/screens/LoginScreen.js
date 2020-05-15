import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
	return (
		<>
			<View style={styles.logoContainerStyle}>
				<Image
					source={require("../../assets/nonamelogo/Logo_NoBG.png")}
					style={styles.logoStyle}
				/>
			</View>

			<View style={styles.formStyle}>
				<View style={styles.formHeaderStyle}>
					<Text style={{ fontSize: hp("4%") }}>Login</Text>
				</View>

				{/* Form goes here */}

				<Formik
					initialValues={{
						email: "johndoe@test.com",
						pass: "password",
					}}
					onSubmit={(values, actions) => {
						alert(JSON.stringify(values));
						/*
							TODO:
								- call login API here after validation
						*/
					}}>
					{formikProps => (
						<>
							<TextInput
								style={styles.formInput}
								placeholder={formikProps.initialValues.email}
								onChangeText={formikProps.handleChange("email")}
							/>
							<TextInput
								style={styles.formInput}
								placeholder={formikProps.initialValues.pass}
								onChangeText={formikProps.handleChange("pass")}
							/>
							<TouchableOpacity
								style={styles.submitButtonStyle}
								onPress={formikProps.handleSubmit}>
								<Text style={styles.submitButtonTextStyle}>
									Sign In
								</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>

				<View style={{ flex: 1 }}>
					<TouchableOpacity style={styles.forgotPassButtonStyle}>
						<Text
							style={styles.forgotPassTextStyle}
							onPress={() => {
								navigation.navigate("ResetPassword");
							}}>
							Forgot Password?
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.signUpStyle}>
					<TouchableOpacity
						style={{
							width: "80%",
							height: "20%",
							alignItems: "center",
							justifyContent: "center",
						}}
						onPress={() => {
							navigation.navigate("Signup");
						}}>
						<Text style={{ color: "#fd7719" }}>
							No Account? Sign up!
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fefffe",
		// borderWidth : 1
	},

	// Logo Styles
	logoContainerStyle: {
		alignSelf: "center",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: hp(5),
		width: wp("70%"),
		height: hp("50%"),
		// borderWidth : 1
	},

	logoStyle: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},

	// Login Form Styles
	formStyle: {
		alignSelf: "center",
		flex: 3,
		width: wp("80%"),
		justifyContent: "space-between",
	},

	formHeaderStyle: {
		fontSize: hp("4%"),
		alignSelf: "center",
		justifyContent: "center",
		paddingBottom: hp("5%"),
		flex: 1,
	},

	formInput: {
		borderWidth: 1,
		borderColor: "#fd7719",
		borderRadius: 5,
		margin: 5,
		padding: 7,
		height: 40,
	},

	submitButtonStyle: {
		backgroundColor: "#fd7719",
		borderRadius: 5,
		padding: hp("1%"),
		height: 40,
		margin: 5,
		alignItems: "center",
		justifyContent: "center",
	},

	submitButtonTextStyle: {
		// fontSize: hp("2%"),
		textAlign: "center",
		color: "white",
	},

	forgotPassTextStyle: {
		fontSize: hp("2%"),
		textAlign: "center",
		color: "#fd7719",
	},

	forgotPassButtonStyle: {
		borderRadius: 5,
		marginTop: hp(1),
		padding: hp("1%"),
		borderWidth: 1,
		borderColor: "#fd7719",
		// flex : 1,
		alignItems: "center",
		justifyContent: "center",
	},

	// Or text styling

	orTextStyle: {
		alignSelf: "center",
		fontSize: hp("2%"),
		padding: hp("3.5%"),
		flex: 1,
	},

	// Other sign in option styling

	placeholderStyle: {
		borderRadius: 5,
		padding: hp("1.5%"),
		margin: hp("1%"),
		width: wp("80%"),
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	signUpStyle: {
		borderRadius: 5,
		padding: hp("1.5%"),
		flex: 2,
		alignItems: "center",
		justifyContent: "flex-end",
	},
});

export default LoginScreen;
