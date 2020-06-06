import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import globalStyles from "../../styles/styles";

// Validation Schema
const validationSchema = Yup.object().shape({
	password: Yup.string().required(),
	confirmPassword: Yup.string()
		.required()
		.equals([Yup.ref("password")], "Passwords do not match"),
});

const NewPassword = ({ navigation }) => {
	return (
		<>
			<View style={globalStyles.logoContainer}>
				<Image
					source={require("../../../assets/nonamelogo/Logo_NoBG.png")}
					style={globalStyles.logo}
				/>
			</View>
			<View style={globalStyles.formContainer}>
				<Text style={globalStyles.formHeader}>New Password Screen</Text>
				<Formik
					initialValues={{
						password: "",
						confirmPassword: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 1000);
					}}>
					{formikProps => (
						<>
							<FormInput
								formikProps={formikProps}
								formikKey={"password"}
								placeholder={"Enter Password"}
								secureTextEntry
							/>
							<FormInput
								formikProps={formikProps}
								formikKey={"confirmPassword"}
								placeholder={"Re-Enter Password"}
								secureTextEntry
							/>
							{formikProps.isSubmitting ? (
								<ActivityIndicator />
							) : null}

							<TouchableOpacity
								style={globalStyles.opaqueButton}
								onPress={formikProps.handleSubmit}>
								<Text style={{ color: "#fefffe" }}>Submit</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</View>
		</>
	);
};

export default NewPassword;
