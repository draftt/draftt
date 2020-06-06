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
import FormInput from "../../components/FormInput";
import globalStyles from "../../styles/styles";

const LoginScreen = ({ navigation }) => {
	const validationSchema = yup.object().shape({
		user: yup.string().required("Username/Email is required"),
		password: yup.string().required("Password is required"),
	});

	return (
		<>
			<View style={globalStyles.logoContainer}>
				<Image
					source={require("../../../assets/nonamelogo/Logo_NoBG.png")}
					style={globalStyles.logo}
				/>
			</View>

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