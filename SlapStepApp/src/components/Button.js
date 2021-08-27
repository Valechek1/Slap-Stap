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
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 160,
  },
  appButtonContainerDisabled: {
    backgroundColor: "#99fff5",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
