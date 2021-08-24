import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

const Splash = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    let hasToken = false;
    if (hasToken) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, [navigation]);

  return (
    <View style={styles.box}>
      <Image source={require("../../assets/SlapStep.png")} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 300,
  },
});

export default Splash;
