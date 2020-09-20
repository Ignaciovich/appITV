import React from "react";
import { View } from "react-native";

const HR = ({ size, color }) => (
	<View
		style={{
            borderBottomColor: color || "#2193F3",
            borderTopColor: color || "#2193F3",
            borderBottomWidth: 0.75,
            borderTopWidth: 0.75,
			margin: 10,
			width: size || "95%",
			marginTop: 10,
		}}
	/>
);

export default HR;