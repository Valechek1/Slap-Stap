import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const WrapperView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoginCode = () => {
  // TODO Get phone number from route params
  const route = useRoute();
  const { phone } = route.params;

  return (
    <WrapperView>
      <Text>Третий Экран</Text>
      <Text>{phone}</Text>
    </WrapperView>
  );
};

export default LoginCode;
