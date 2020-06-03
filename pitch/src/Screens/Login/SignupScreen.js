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
import * as Yup from "yup";
import FormInput from "../Components/FormInput";

const SignupScreen = ({ navigation }) => {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required(),
		username: Yup.string().required(),
		email: Yup.string()
			.required()
			.email("Please enter a valid email address"),
		password: Yup.string().required(),
		confirmPassword: Yup.string()
			.required()
			.equals([Yup.ref("password")], "Passwords do not match"),
	});

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
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						alert(JSON.stringify(values));
						/*
							TODO:
								- call Signup API here after validation
						*/
					}}>
					{formikProps => (
						<>
							<FormInput
								formikProps={formikProps}
								formikKey={"name"}
								placeholder={"Name"}
							/>
							<FormInput
								formikProps={formikProps}
								formikKey={"username"}
								placeholder={"Username"}
							/>
							<FormInput
								formikProps={formikProps}
								formikKey={"email"}
								placeholder={"Email"}
							/>
							<FormInput
								formikProps={formikProps}
								formikKey={"password"}
								placeholder={"Password"}
								secureTextEntry
							/>
							<FormInput
								formikProps={formikProps}
								formikKey={"confirmPassword"}
								placeholder={"Confirm Password"}
								secureTextEntry
							/>
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
