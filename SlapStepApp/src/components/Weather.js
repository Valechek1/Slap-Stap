import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getWeatherAPI } from "../api";

const getWeatherCustomStatus = (weatherData) => {
  let dataWeatherTemp = weatherData.main.temp.toFixed();
  if (
    Number(dataWeatherTemp - 273) >= 0 &&
    Number(dataWeatherTemp - 273) <= 5
  ) {
    return "Сейчас холодно";
  } else if (
    Number(dataWeatherTemp - 273) >= 6 &&
    Number(dataWeatherTemp - 273) <= 10
  ) {
    return "Сейчас прохладно для прогулки";
  } else if (
    Number(dataWeatherTemp - 273) >= 11 &&
    Number(dataWeatherTemp - 273) <= 16
  ) {
    return "Самое время пройтись";
  } else if (
    Number(dataWeatherTemp - 273) >= 17 &&
    Number(dataWeatherTemp - 273) <= 23
  ) {
    return "Идеальная температура для прогулки";
  } else if (
    Number(dataWeatherTemp - 273) >= 24 &&
    Number(dataWeatherTemp - 273) <= 30
  ) {
    return "Жарковато сейчас, не забудьте про воду";
  }

  return "Лучше дома походить";
};

export default function Weather() {
  const [dataWeather, setDataWeather] = useState();

  const fetchWeather = () => {
    getWeatherAPI()
      .then((weather) => {
        setDataWeather(weather);
      })
      .catch((err) => console.log("Error", err));
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View>
      {dataWeather && (
        <>
          <View style={styles.boxWeather}>
            <Text style={styles.text}>{dataWeather.name}</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: `https://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png`,
              }}
            />
            <Text style={styles.textPogoda}>
              {(dataWeather.main.temp - 273).toFixed()}°С
            </Text>
          </View>
          <View>
            <Text style={styles.textMessage}>
              {getWeatherCustomStatus(dataWeather)}
            </Text>
          </View>
        </>
      )}
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
  boxWeather: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F0DDBC",
    width: "90%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  textMessage: {
    fontWeight: "600",
    letterSpacing: 1.2,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    textAlign: "center",
    color: "#ebbe40",
  },
  boxWeatherRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textPogoda: {
    fontSize: 30,
    fontWeight: "900",
  },
});
