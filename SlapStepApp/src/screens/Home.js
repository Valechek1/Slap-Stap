import React from "react";
import { StyleSheet, View } from "react-native";
import Pedometr from "../components/Pedometr";

export default function Home() {
  return (
    <View style={styles.container}>
      <Pedometr />
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
