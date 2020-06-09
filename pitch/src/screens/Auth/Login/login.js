import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormInput from "components/forminput";
import Logo from "components/logo";
import globalStyles from "styles/styles";
import userApi from "src/api/user";

// Helper Functions
const SIMPLE_EMAIL_REGEX = /\S+@\S+\.\S+/;

// Handle Login
const handleLogin = async (
	setToken,
	setEmail,
	setUsername,
	formikValues,
	formikActions
) => {
	console.log("in loginUser in login.js");

	// determine if we have an email or a username
	const result = SIMPLE_EMAIL_REGEX.test(formikValues.user);
	const params = new FormData(); // .set() does not work, use .append()
	params.append("grant_type", "password");
	params.append("password", formikValues.password);
	params.append("client_id", "T001");
	params.append("client_secret", "R2D2");

	if (result) {
		console.log("Entered an email");
		params.append("grant_sub_type", "email");
		params.append("email", formikValues.user);
	} else {
		console.log("Entered a username");
		params.append("grant_sub_type", "username");
		params.append("username", formikValues.user);
	}

	// call API
	var response = null;
	console.log(params);
	try {
		response = await userApi.post("/auth/token/", params);
		console.log("SUCCESS");
		alert("LOGGED IN");
	} catch (error) {
		console.log(error);
		alert("COULD NOT SIGN IN");
	} finally {
		formikActions.setSubmitting(false);
	}
	// setup global state
};

const Login = ({
	setToken,
	setEmail,
	setUsername,
	token,
	email,
	username,
	navigation,
}) => {
	const validationSchema = yup.object().shape({
		user: yup.string().required("Username/Email is required"),
		password: yup.string().required("Password is required"),
	});

	return (
		<View style={globalStyles.rootContainer}>
			<Logo />

			<View style={globalStyles.formContainer}>
				<Text style={globalStyles.formHeader}>Login</Text>
				<Formik
					initialValues={{
						user: "",
						password: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						handleLogin(
							setToken,
							setEmail,
							setUsername,
							values,
							actions
						);
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
									style={globalStyles.opaqueButton}
									onPress={formikProps.handleSubmit}>
									<Text style={{ color: "#fefffe" }}>
										Sign In
									</Text>
								</TouchableOpacity>
							)}
						</>
					)}
				</Formik>

				<TouchableOpacity style={globalStyles.transparentButton}>
					<Text
						style={{ color: "#fd7719" }}
						onPress={() => {
							navigation.navigate("ResetPassword");
						}}>
						Forgot Password?
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={globalStyles.transparentButton}
					onPress={() => {
						navigation.navigate("Signup");
					}}>
					<Text style={{ color: "#fd7719" }}>
						No Account? Sign up!
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Login;
