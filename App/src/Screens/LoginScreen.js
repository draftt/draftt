import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik } from "formik";
import * as yup from "yup";
import FormInput from "../Components/FormInput";

const LoginScreen = ({ navigation }) => {
	// Validation

	const validationSchema = yup.object().shape({
		user: yup.string().required(),
		password: yup.string().required(),
	});

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
				<Formik
					initialValues={{
						user: "",
						password: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 2000);

						alert("no frontend errors");
						/*
							TODO:
								- call login API here after validation
						*/
					}}>
					{formikProps => (
						<>
							<FormInput
								formikProps={formikProps}
								formikKey={"user"}
								placeholder={"Username"}
							/>
							<FormInput
								formikProps={formikProps}
								formikKey={"password"}
								placeholder={"Password"}
								secureTextEntry={true}
							/>

							{formikProps.isSubmitting ? (
								<ActivityIndicator />
							) : (
								<TouchableOpacity
									style={styles.submitButtonStyle}
									onPress={formikProps.handleSubmit}>
									<Text style={styles.submitButtonTextStyle}>
										Sign In
									</Text>
								</TouchableOpacity>
							)}
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
		borderColor: "#fd7719",
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
