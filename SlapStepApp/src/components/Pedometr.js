import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    <View>
      {isPedometerAvailable === undefined && (
        <Text>Waiting for permissions</Text>
      )}
      {isPedometerAvailable === false && (
        <Text>Проблемы с получением инфы по шагам</Text>
      )}
      <Text>Number of steps {currentStepCount}</Text>
    </View>
  );
}
