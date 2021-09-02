import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

export default function Top() {
  return (
    <View style={styles.boxTop}>
      <Image
        style={styles.leftStep}
        source={require("../../assets/StepLeft.png")}
      />
      <Image
        style={{ width: 80, height: 80 }}
        source={require("../../assets/icons8-Stars.png")}
    />
      <Image
        style={styles.rightStep}
        source={require("../../assets/Step.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 5,
    fontWeight: "600",
    letterSpacing: 1.5,
  },

  boxTop: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 40,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F0DDBC",
    width: "90%",
    height: "15%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  leftStep: {
    width: 45,
    height: 45,
  },
  rightStep: {
    width: 45,
    height: 45,
  },
});
