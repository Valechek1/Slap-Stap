import { useNavigation } from "@react-navigation/native";
import * as React from "react";

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

  return null;
};

export default Splash;
