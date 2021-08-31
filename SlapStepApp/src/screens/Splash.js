import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    // AsyncStorage.clear();
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      })
      .catch((err) => {
        console.log("Ooops", err);
      });
  }, []);

  const handleClick = React.useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  return (
    <View style={styles.box}>
      <Image
        source={require("../../assets/SlapStepLOGO.png")}
        style={styles.img}
      />
      <Button
        title="registration"
        handleClick={handleClick}
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a4257",
  },
  img: {
    width: 300,
    height: 300,
    marginBottom: 100,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
});

export default Splash;
