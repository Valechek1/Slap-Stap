import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Pedometer } from "expo-sensors";

export default function Pedometr() {
  const [isPedometerAvailable, changeIsPedometerAvailable] =
    useState(undefined);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    let intervalId;
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

        intervalId = setInterval(() => {
          Pedometer.getStepCountAsync(startOfTheDay, new Date()).then(
            ({ steps }) => {
              setCurrentStepCount(steps);
            }
          );
        }, 5 * 1000);
      });

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <View style={styles.boxPedometr}>
      {isPedometerAvailable === undefined && (
        <Text style={styles.text}>Waiting for permissions</Text>
      )}
      {isPedometerAvailable === false && (
        <Text style={styles.text}></Text>
      )}
      <View>
        <Image
          source={require("../../assets/pedometrLOGO.png")}
          style={styles.img}
        />
        <Text style={styles.text}>Your SlapStep</Text>
        <Text style={styles.textTu}>{currentStepCount}</Text>
        <Image
          source={require("../../assets/Step.png")}
          style={styles.imgStepRight}
        />
        <Image
          source={require("../../assets/StepLeft.png")}
          style={styles.imgStepLeft}
        />
        <Image
          source={require("../../assets/StepLeft.png")}
          style={styles.imgStepLeftOne}
        />
        <Image
          source={require("../../assets/Step.png")}
          style={styles.imgStepRightOne}
        />
        <Image
          source={require("../../assets/StepLeft.png")}
          style={styles.imgStepLeftTwo}
        />
        <Image
          source={require("../../assets/Step.png")}
          style={styles.imgStepRightThee}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 5,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "Arial",
    position: "absolute",
    top: 70,
    left: 40,
  },
  textTu: {
    fontSize: 20,
    margin: 5,
    fontWeight: "600",
    letterSpacing: 1.5,
    position: "absolute",
    top: 140,
    left: 90,
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 30,
  },
  boxPedometr: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
  },
  img: {
    width: 300,
    height: 300,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  imgStepRight: {
    width: 43,
    height: 43,
    borderRadius: 100,
    position: "absolute",
    top: 230,
    left: 150,
    transform: [{ rotate: "50deg" }],
  },
  imgStepLeft: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    top: 230,
    left: 98,
    transform: [{ rotate: "50deg" }],
  },
  imgStepLeftOne: {
    width: 37,
    height: 37,
    borderRadius: 100,
    position: "absolute",
    top: 190,
    left: 170,
    transform: [{ rotate: "50deg" }],
  },
  imgStepRightOne: {
    width: 30,
    height: 30,
    borderRadius: 100,
    position: "absolute",
    top: 185,
    left: 210,
    transform: [{ rotate: "50deg" }],
  },
  imgStepLeftTwo: {
    width: 30,
    height: 30,
    borderRadius: 100,
    position: "absolute",
    top: 150,
    left: 225,
    transform: [{ rotate: "50deg" }],
  },
  imgStepRightThee: {
    width: 25,
    height: 25,
    borderRadius: 100,
    position: "absolute",
    top: 140,
    left: 255,
    transform: [{ rotate: "50deg" }],
  },
});
