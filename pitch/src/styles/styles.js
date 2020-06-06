// This file is for commonly used styles
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	// INPUT STYLING
	input: {
		borderWidth: 1,
		borderColor: "#fd7719",
		borderRadius: 5,
		margin: 5,
		padding: 7,
		height: 40,
	},

	// BUTTON STYLING
	opaqueButton: {
		marginTop: 15,
		backgroundColor: "#fd7719",
		borderRadius: 10,
		height: 50,
		margin: 5,
		padding: 7,
		alignItems: "center",
		justifyContent: "center",
	},

	// TEXT STYLING
	errorText: {
		color: "red",
		margin: 5,
	},
});

export default styles;
