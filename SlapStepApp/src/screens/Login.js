import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, Text, StyleSheet, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { startAuth } from "../api";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 25,
    height: 25,
    lineHeight: 38,
    fontSize: 19,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00000030",
    textAlign: "center",
    paddingBottom: 40,
    marginLeft: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
});

const CELL_COUNT = 11;

const Login = () => {
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={phone}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onChangeText={(v) => setPhone(v)}
        placeholder="Phone here"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {error && <Text>ERROR: {error.message}</Text>}
      <Button title="Login" onPress={handleClick} />
    </SafeAreaView>
  );
};

export default Login;
