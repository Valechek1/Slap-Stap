import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const WrapperView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoginCode = () => {
  return (
    <WrapperView>
      <Text>Третий Экран</Text>
    </WrapperView>
  );
};

export default LoginCode;
