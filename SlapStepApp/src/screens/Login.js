import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, TextInput, Text } from "react-native";
import styled from "styled-components/native";
import { startAuth } from "../api";

const WrapperView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState();

  const handleClick = React.useCallback(() => {
    startAuth(phone)
      .then(() => {
        navigation.navigate("LoginCode", { phone });
      })
      .catch((err) => {
        setError(err);
      });
  }, [phone]);

  return (
    <WrapperView>
      <TextInput
        value={phone}
        keyboardType="number-pad"
        onChangeText={(v) => setPhone(v)}
        placeholder="Phone here"
      />
      {error && <Text>ERROR: {error.message}</Text>}
      <Button title="Login" onPress={handleClick} />
    </WrapperView>
  );
};

export default Login;
