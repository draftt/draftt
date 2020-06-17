import React from "react";
import api from "src/api";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "components/forminput";
import Logo from "components/logo";
import globalStyles from "styles/styles";

// Helper functions

const activateUser = async (
	values,
	actions,
	navigation,
	setUserInfo,
	uid,
	timestamp
) => {
	const params = {};
	params.uid = uid;
	params.token = timestamp + "-" + values.code;

	api.post("/user/activate/", params)
		.then(res => {
			setUserInfo({ isActive: true });
			navigation.navigate("Login");
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
			setTimeout(() => {
				actions.setSubmitting(false);
			}, 1000);
		});
};

// Validation Schema
const validationSchema = Yup.object().shape({
	code: Yup.number()
		.required("Activation Code is required")
		.label("Activation Code"),
});

const ActivateAccount = ({ uid, timestamp, setUserInfo, navigation }) => {
	return (
		<View style={globalStyles.rootContainer}>
			<Logo />
			<View style={globalStyles.formContainer}>
				<Text style={globalStyles.formHeader}>Activate Account</Text>
				<Formik
					initialValues={{ code: "" }}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						activateUser(
							values,
							actions,
							navigation,
							setUserInfo,
							uid,
							timestamp
						);
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
