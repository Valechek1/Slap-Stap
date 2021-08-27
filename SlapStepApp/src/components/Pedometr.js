import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";

export default function Pedometr() {
  const [isPedometerAvailable, changeIsPedometerAvailable] =
    useState(undefined);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    let timeoutId;
    const startOfTheDay = new Date();
    startOfTheDay.setHours(0);
    startOfTheDay.setMinutes(0);
    startOfTheDay.setSeconds(0);

    Pedometer.isAvailableAsync()
      .then((result) => {
        changeIsPedometerAvailable(result);
        if (result) {
          return Pedometer.getStepCountAsync(startOfTheDay, new Date());
        }
      })
      .then((result) => {
        if (!result) {
          return;
        }
        const { steps } = result;
        setCurrentStepCount(steps);

        timeoutId = setTimeout(() => {
          Pedometer.getStepCountAsync(startOfTheDay, new Date()).then(
            ({ steps }) => {
              setCurrentStepCount(steps);
            }
          );
        }, 5 * 1000);
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <View style={styles.boxPedometr}>
      {isPedometerAvailable === undefined && (
        <Text style={styles.text}>Waiting for permissions</Text>
      )}
      {isPedometerAvailable === false && (
        <Text style={styles.text}>Проблемы с получением инфы по шагам</Text>
      )}
      <Text style={styles.text}>Number of steps {currentStepCount}</Text>
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
  boxPedometr: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#32cd32",
    width: "90%",
    borderRadius: 10,
  },
});
