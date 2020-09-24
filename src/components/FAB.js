import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {getColors as AppColors} from '../styles/colors';
import Ionicons from "react-native-vector-icons/Ionicons";

const size = 50;

const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 3 },
    shadowColor: AppColors.black,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  text: {
    fontWeight: "bold"
  }
});

const FAB = props => {
  const { fabStyle, textStyle, icon, ...otherProps } = props;
  return (
    <TouchableOpacity style={[styles.container, fabStyle]} {...otherProps}>
      <Ionicons
        name={icon}
        size={20}
        color={AppColors.white}
        style={styles.icon}/>
    </TouchableOpacity>
  );
};

export default FAB;