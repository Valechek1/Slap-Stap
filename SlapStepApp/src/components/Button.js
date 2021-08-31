import * as React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Button(props) {
  const touchableStyles = [
    styles.appButtonContainer,
    props.disabled ? styles.appButtonContainerDisabled : undefined,
  ];
  return (
    <TouchableOpacity
      onPress={props.handleClick}
      style={touchableStyles}
      disabled={props.disabled}
    >
      <Text style={styles.appButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "wheat",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 160,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  appButtonContainerDisabled: {
    backgroundColor: "#99fff5",
  },
  appButtonText: {
    fontSize: 18,
    color: "#3A4257",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
