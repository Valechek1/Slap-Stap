import React from "react";
import Pedometr from "../components/Pedometr";
import { StyleSheet, View } from "react-native";
import Weather from "../components/Weather";

export default function Home() {
  return (
    <View style={styles.container}>
      <Weather />
      <Pedometr />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#3A4257",
    alignItems: "center",
  },
});
