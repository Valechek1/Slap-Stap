import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

const WrapperView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Splash = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.navigate("Login");
  }, [navigation]);

  return (
    <WrapperView>
      <Button
        title="Переход на Login"
        onPress={() => navigation.navigate("Login", { name: "Splash" })}
      />
    </WrapperView>
  );
};

export default Splash;
