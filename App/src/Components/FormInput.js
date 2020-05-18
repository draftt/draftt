import React from "react";
import { StyleSheet, TextInput, Text } from "react-native";

const FormInput = ({ formikProps, formikKey, ...rest }) => {
	return (
		<>
			<TextInput
				style={styles.input}
				onChangeText={formikProps.handleChange(formikKey)}
				onBlur={formikProps.handleBlur(formikKey)}
				{...rest}
			/>
			{formikProps.errors[formikKey] && formikProps.touched[formikKey] ? (
				<Text style={styles.error}>
					{formikProps.errors[formikKey]}
				</Text>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "#fd7719",
		borderRadius: 5,
		margin: 5,
		padding: 7,
		height: 40,
	},
	error: {
		color: "red",
		margin: 5,
	},
});

export default FormInput;
