import React from "react";
import Pedometr from "../components/Pedometr";
import { StyleSheet, View } from "react-native";
import Weather from "../components/Weather";

export default function Home() {
  return (
    <View style={styles.container}>
      <Pedometr />
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
