import { View, Text } from "react-native";
import React from "react";

interface Props {
  children: JSX.Element;
}

const Modal: React.FC<Props> = ({ children }) => {
  return <View>{children}</View>;
};

export default Modal;
