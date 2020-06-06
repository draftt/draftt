// This file is for commonly used styles
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	// FORM STYLING
	input: {
		borderWidth: 1,
		borderColor: "#fd7719",
		borderRadius: 5,
		margin: 5,
		padding: 7,
		height: 40,
	},
	formHeader: {
		fontSize: 40,
		padding: 20,
		alignSelf: "center",
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

	// LOGO STYLING
	logo: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
});

export default styles;
