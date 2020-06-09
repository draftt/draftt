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
	setUserInfo,
	formikValues,
	formikActions,
	navigation
) => {
	const params = new FormData(); // .set() does not work, use .append()
	params.append("grant_type", "password");
	params.append("password", formikValues.password);
	params.append("client_id", "T001");
	params.append("client_secret", "R2D2");

	// determine if we have an email or a username
	const isEmailLogin = SIMPLE_EMAIL_REGEX.test(formikValues.user);

	if (isEmailLogin) {
		params.append("grant_sub_type", "email");
		params.append("email", formikValues.user);
	} else {
		params.append("grant_sub_type", "username");
		params.append("username", formikValues.user);
	}

	// call API
	var response = null;
	try {
		response = await userApi.post("/auth/token/", params);
		let res = response.data;

		if (isEmailLogin) {
			res= {...res, email: formikValues.user}
		} else {
			res = {...res, username: formikValues.user}
		}
		console.log(res)
		// Set in redux store
		setUserInfo(res);

		// TODO: this will be changed to an authenticated navigator
		navigation.navigate("Home");
	} catch (error) {
		console.log(error)
		// TODO: need to better this error
		alert("COULD NOT SIGN IN");
	} finally {
		formikActions.setSubmitting(false);
	}
};

const Login = ({ setUserInfo, navigation }) => {
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
							setUserInfo,
							values,
							actions,
							navigation
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
