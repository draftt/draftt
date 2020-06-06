import React from "react";
import { View, Image } from "react-native";
import globalStyles from "../styles/styles";

export default () => {
	return (
		<View style={globalStyles.logoContainer}>
			<Image
				source={require("../../assets/nonamelogo/Logo_NoBG.png")}
				style={globalStyles.logo}
			/>
		</View>
	);
};
