import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import FormInput from "../Components/FormInput";

const ResetPassword = ({ navigation }) => {
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required()
			.label("Email Address")
			.email("Please enter a valid email address"),
	});
	return (
		<View style={styles.containerStyle}>
			<View style={styles.logoContainerStyle}>
				<Image
					source={require("../../assets/logo/Logo_NoBG.png")}
					style={styles.logoStyle}
				/>
			</View>

			<Text style={styles.titleStyle}>Reset Password Screen</Text>

			<View style={styles.resetContainerStyle}>
				<Text>Enter email address to reset password</Text>
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
								placeholder={"Email address"}
							/>

							{formikProps.isSubmitting ? (
								<ActivityIndicator />
							) : null}

							<TouchableOpacity
								style={styles.arrowButtonStyle}
								onPress={formikProps.handleSubmit}>
								<Text style={{ color: "#fefffe" }}>Submit</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		backgroundColor: "#fefffe",
		justifyContent: "flex-start",
	},

	logoContainerStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: wp("50%"),
		height: hp("35%"),
		alignSelf: "center",
		paddingTop: hp(10),
		// borderWidth : 1
	},

	logoStyle: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},

	titleStyle: {
		// flex : 1,
		fontSize: hp(3),
		alignSelf: "center",
		padding: hp(5),
		// borderWidth : 1
	},

	resetContainerStyle: {
		flex: 1,
		paddingHorizontal: wp(2),
	},

	resetTextStyle: {
		fontSize: hp(2),
		paddingTop: hp(3),
		paddingBottom: hp(1),
	},

	inputStyle: {
		// flex : 1,
		borderWidth: 1,
		padding: hp(1),
	},

	arrowContainerStyle: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: wp(4),
	},

	arrowButtonStyle: {
		backgroundColor: "#fd7719",
		borderRadius: 5,
		padding: hp("1%"),
		height: 40,
		margin: 5,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ResetPassword;
