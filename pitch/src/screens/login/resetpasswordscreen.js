import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/forminput";
import Logo from "../../components/logo";
import globalStyles from "../../styles/styles";

// Validation Schema
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required()
		.label("Email Address")
		.email("Please enter a valid email address"),
});

const ResetPassword = ({ navigation }) => {
	return (
		<View style={globalStyles.rootContainer}>
			<Logo />
			<View style={globalStyles.formContainer}>
				<Text style={globalStyles.formHeader}>
					Reset Password Screen
				</Text>
				<Formik
					initialValues={{ email: "" }}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						// Call reset password Api Here
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 1000);
					}}>
					{formikProps => (
						<>
							<FormInput
								formikProps={formikProps}
								formikKey={"email"}
								placeholder={"Enter email address"}
							/>

							{formikProps.isSubmitting ? (
								<ActivityIndicator />
							) : null}

							<TouchableOpacity
								style={globalStyles.opaqueButton}
								onPress={formikProps.handleSubmit}>
								<Text style={{ color: "#fefffe" }}>
									Reset Password
								</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</View>
		</View>
	);
};

export default ResetPassword;
