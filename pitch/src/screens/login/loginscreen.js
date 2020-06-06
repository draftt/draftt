import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/forminput";
import Logo from "../../components/logo";
import globalStyles from "../../styles/styles";

const LoginScreen = ({ navigation }) => {
	const validationSchema = yup.object().shape({
		user: yup.string().required("Username/Email is required"),
		password: yup.string().required("Password is required"),
	});

	return (
		<>
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
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 1000);

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
		</>
	);
};

export default LoginScreen;
