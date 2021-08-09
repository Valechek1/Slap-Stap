// In App.js in a new project

import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const WrapperView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Splash = () => {
  return (
    <WrapperView>
      <Text>Splash Screen</Text>
    </WrapperView>
  );
};

export default Splash;
