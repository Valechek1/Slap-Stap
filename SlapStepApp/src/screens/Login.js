import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";
import { startAuth } from "../api";
import Button from "../components/Button";
import { Image, StyleSheet, View } from "react-native";

const Login = (props) => {
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
        onChangeText={(v) => setPhone(v)}
        placeholder="Введите номер телефона"
      />
      {error && <ErrorText>ERROR: {error.message}</ErrorText>}
      <Button
        style={styles.stretbtn}
        title="Login"
        handleClick={handleClick}
        disabled={!phone}
      />
      <View style={styles.stretch}>
        <Image
          style={styles.stretimage}
          source={require("../../assets/MotivOne.png")}
        />
      </View>
    </Wrapper>
  );
};

const Wrapper = styled.SafeAreaView`
  flex: 2;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  background-color: #3a4257;
`;

const PhoneInput = styled.TextInput`
  margin: 24px;
  margin-bottom: 40px;
  padding: 12px;
  width: 90%;
  border: 1px solid black;
  border-radius: 6px;
  color: black;
  background-color: wheat;
  box-shadow: 0 2px 2px black;
`;

const ErrorText = styled.Text`
  margin-horizontal: 24px;
  padding: 12px;
  margin-bottom: 24px;
  color: wheat;
`;

const styles = StyleSheet.create({
  stretch: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    marginTop: 40,
  },
  stretimage: {
    width: "80%",
    height: "80%",
    borderRadius: 30,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
});

export default Login;
