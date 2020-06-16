import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "components/forminput";
import Logo from "components/logo";
import globalStyles from "styles/styles";

// Validation Schema
const validationSchema = Yup.object().shape({
	code: Yup.number()
		.required("Activation Code is required")
		.label("Activation Code"),
});

const ActivateAccount = ({ navigation }) => {
	return (
		<View style={globalStyles.rootContainer}>
			<Logo />
			<View style={globalStyles.formContainer}>
				<Text style={globalStyles.formHeader}>Activate Account</Text>
				<Formik
					initialValues={{ code: "" }}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						// TODO: need to call backend api to activate user

						// Call reset password Api Here
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 1000);
					}}>
					{formikProps => (
						<>
							<FormInput
								formikProps={formikProps}
								formikKey={"code"}
								placeholder={
									"Enter Activation Code sent to your email"
								}
							/>

							{formikProps.isSubmitting ? (
								<ActivityIndicator />
							) : null}

							<TouchableOpacity
								style={globalStyles.opaqueButton}
								onPress={formikProps.handleSubmit}>
								<Text style={{ color: "#fefffe" }}>
									Activate Account
								</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</View>
		</View>
	);
};

export default ActivateAccount;
