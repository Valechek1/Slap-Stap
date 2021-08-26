import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "../components/Button";

// стартовая страница

const Splash = () => {
  const navigation = useNavigation();

  const handleClick = React.useCallback(() => {
    let hasToken = true;
    if (hasToken) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, [navigation]);

  return (
    <View style={styles.box}>
      <Image
        source={require("../../assets/SlapStepLOGO.png")}
        style={styles.img}
      />
      <Button handleClick={handleClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  img: {
    width: 300,
    height: 300,
  },
});

export default Splash;
