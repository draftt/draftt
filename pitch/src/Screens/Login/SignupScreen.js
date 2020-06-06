import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../Components/FormInput";
import api from "../../Api/user";

// Helper functions

// Handle Signup
const handleSubmit = (values, actions) => {
	const params = {
		fullname: values.name,
		username: values.username,
		email: values.email,
		password: values.password,
	};

	api.post("/user/create/", params)
		.then(response => {
			// Successfully signed up
			// TODO: Will need to navigate to someplace else from here
			console.log(response);
		})
		.catch(err => {
			// Error signing up
			if (err.code === "ECONNABORTED") {
				// server timed out
				alert("Server took too long to respond");
			} else {
				// server returned an error
				switch (err.response.status) {
					case 400:
						const serverValidErr = err.response.data;
						actions.setErrors(serverValidErr);
						break;
					default:
						alert("Oops...Something went wrong");
						console.log(err.response);
				}
			}
		})
		.finally(() => {
			// in all cases, we want to set submitting to false to disable spinner
			actions.setSubmitting(false);
		});
};

// Validation Schema
const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	username: Yup.string().required("Username is required"),
	email: Yup.string()
		.required("Email is required")
		.email("Please enter a valid email address"),
	password: Yup.string().required("Password is required"),
	confirmPassword: Yup.string()
		.required("Enter password again")
		.equals([Yup.ref("password")], "Passwords do not match"),
});

// Component
const SignupScreen = ({ navigation }) => {
	return (
		<>
			<View style={styles.logoContainerStyle}>
				<Image
					source={require("../../../assets/nonamelogo/Logo_NoBG.png")}
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
					onSubmit={(values, actions) =>
						handleSubmit(values, actions)
					}>
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
							{formikProps.isSubmitting ? (
								<ActivityIndicator />
							) : (
								<TouchableOpacity
									style={styles.signupButtonStyle}
									onPress={formikProps.handleSubmit}>
									<Text style={{ color: "#fefffe" }}>
										Sign up
									</Text>
								</TouchableOpacity>
							)}
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
