import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

const WrapperView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  const navigation = useNavigation();
  return (
    <WrapperView>
      <Button
        title="Переход на LoginCode"
        onPress={() => navigation.navigate("LoginCode", { name: "LoginCode" })}
      />
    </WrapperView>
  );
};

export default Login;
