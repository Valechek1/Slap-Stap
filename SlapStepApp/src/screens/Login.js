import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import { startAuth } from "../api";

const Wrapper = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  justify-content: flex-start;
`;

const PhoneInput = styled.TextInput`
  margin: 24px;
  margin-bottom: 12px;
  padding: 12px;
  width: 90%;
  border: 1px solid black;
  border-radius: 6px;
`;

const ErrorText = styled.Text`
  margin-horizontal: 24px;
  padding: 12px;
  margin-bottom: 24px;
  color: red;
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
    <Wrapper>
      <PhoneInput
        value={phone}
        keyboardType="number-pad"
        onChangeText={setPhone}
        placeholder="Phone here"
      />
      {error && <ErrorText>ERROR: {error.message}</ErrorText>}
      <Button title="Login" onPress={handleClick} />
    </Wrapper>
  );
};

export default Login;
