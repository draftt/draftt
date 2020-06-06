import React from "react";
import { TextInput, Text } from "react-native";
import globalStyles from "../styles/styles";

const FormInput = ({ formikProps, formikKey, ...rest }) => {
	return (
		<>
			<TextInput
				style={globalStyles.input}
				onChangeText={formikProps.handleChange(formikKey)}
				onBlur={formikProps.handleBlur(formikKey)}
				{...rest}
			/>
			{formikProps.errors[formikKey] && formikProps.touched[formikKey] ? (
				<Text style={globalStyles.errorText}>
					{formikProps.errors[formikKey]}
				</Text>
			) : null}
		</>
	);
};

export default FormInput;
