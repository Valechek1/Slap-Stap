import * as React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

export default function Button(props) {
  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={props.handleClick} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Registration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 300,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
