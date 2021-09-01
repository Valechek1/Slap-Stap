import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text, SafeAreaView, StyleSheet, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 5;

const LoginCode = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onCodeInput = (code) => {
    setValue(code);
    if (code.length === CELL_COUNT) {
      fetch("https://e461-89-208-20-134.ngrok.io/endAuth", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code, phone: params.phone }),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("We fucked up");
          }
          return res.json();
        })
        .then(({ token }) => {
          return AsyncStorage.setItem("token", token);
        })
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        })
        .catch(() => {
          navigation.goBack();
        });
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification code</Text>
      <CodeField
        ref={ref}
        {...codeProps}
        value={value}
        onChangeText={onCodeInput}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
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
      <View style={styles.boxImg}>
        <Image
          source={require("../../assets/MotivTu.png")}
          style={styles.img}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A4257",
  },
  title: { textAlign: "center", fontSize: 30, color: "wheat", marginTop: 60 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "black",
    textAlign: "center",
    marginLeft: 5,
    paddingTop: 3,
    color: "wheat",
  },
  focusCell: {
    borderColor: "wheat",
  },
  boxImg: {
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
  img: {
    width: "80%",
    height: "80%",
    borderRadius: 30,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
});

export default LoginCode;
