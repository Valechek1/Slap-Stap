import React from "react";
import Pedometr from "../components/Pedometr";
import { View } from "react-native";
import Weather from "../components/Weather";

export default function Home() {
  return (
    <View style={styles.container}>
      <Weather />
      <Pedometr />
    </View>
  );
}

