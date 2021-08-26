import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

const API_KEY = "bd06a8223a71d916a111c9dc6b6eb29a";

async function getWeatherAPI() {
  const api_URL = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${API_KEY}`
  );
  const data = await api_URL.json();
  console.log(data);
  return data;
}

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

  const styles = StyleSheet.create({
    boxWeather: {
      flex: 1,
      backgroundColor: "#32cd32",
      width: "95%",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 20,
      margin: 5,
      fontWeight: "600",
      letterSpacing: 1.5,
    },
  });

  return (
    <View style={styles.boxWeather}>
      {dataWeather && (
        <View>
          <Text style={styles.text}>{dataWeather.name}</Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `https://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png`,
            }}
          />
          <Text style={styles.text}>
            {(dataWeather.main.temp - 273).toFixed()}°С
          </Text>
        </View>
      )}
    </View>
  );
}
