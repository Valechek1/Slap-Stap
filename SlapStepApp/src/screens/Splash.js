import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, Text } from "react-native";
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
      <Text>Screen</Text>
    </WrapperView>
  );
};

export default Splash;
