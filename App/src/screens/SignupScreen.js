import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik } from "formik";

const SignupScreen = ({ navigation }) => {
	return (
		<>
			<View style={styles.logoContainerStyle}>
				<Image
					source={require("../../assets/nonamelogo/Logo_NoBG.png")}
					style={styles.logoStyle}
				/>
			</View>
			<View style={styles.outerFormContainerStyle}>
				<Text style={styles.formHeaderStyle}>Sign up</Text>
				<Formik
					initialValues={{
						name: "",
						username: "",
						email: "",
						password: "",
						confirmPassword: "",
					}}
					onSubmit={(values, actions) => {
						alert(JSON.stringify(values));
						/*
							TODO:
								- call Signup API here after validation
						*/
					}}>
					{formikProps => (
						<>
							<TextInput
								style={styles.formInput}
								placeholder={"Name"}
								onChangeText={formikProps.handleChange(
									"name"
								)}></TextInput>
							<TextInput
								style={styles.formInput}
								placeholder={"Username"}
								onChangeText={formikProps.handleChange(
									"username"
								)}></TextInput>
							<TextInput
								style={styles.formInput}
								placeholder={"Email"}
								onChangeText={formikProps.handleChange(
									"email"
								)}></TextInput>
							<TextInput
								secureTextEntry
								style={styles.formInput}
								placeholder={"Password"}
								onChangeText={formikProps.handleChange(
									"password"
								)}></TextInput>
							<TextInput
								secureTextEntry
								style={styles.formInput}
								placeholder={"Confirm Password"}
								onChangeText={formikProps.handleChange(
									"confirmPassword"
								)}></TextInput>
							<TouchableOpacity
								style={styles.signupButtonStyle}
								onPress={formikProps.handleSubmit}>
								<Text style={{ color: "#fefffe" }}>
									Sign up
								</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	backArrowStyle: {
		flex: 1,
		alignSelf: "flex-start",
		paddingTop: hp(5),
		paddingHorizontal: wp(3),
	},

	signupButtonStyle: {
		marginTop: 15,
		backgroundColor: "#fd7719",
		borderRadius: 10,
		height: wp(10),
		margin: 5,
		padding: 7,
		alignItems: "center",
		justifyContent: "center",
	},

	logoContainerStyle: {
		justifyContent: "center",
		alignItems: "center",
		width: wp("100%"),
		height: hp("15%"),
		marginTop: 30,
	},

	logoStyle: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},

	outerFormContainerStyle: {
		flex: 5,
		width: wp(85),
		alignSelf: "center",
	},

	formHeaderStyle: {
		fontSize: hp(4),
		padding: hp(5),
		alignSelf: "center",
	},

	formInput: {
		borderWidth: 1,
		borderColor: "#fd7719",
		borderRadius: 5,
		margin: 5,
		padding: 7,
		height: 40,
	},
});

export default SignupScreen;
