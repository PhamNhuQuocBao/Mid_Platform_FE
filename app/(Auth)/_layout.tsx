import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        paddingHorizontal: 30,
      }}
    >
      <Slot />
    </SafeAreaView>
  );
};

export default AuthLayout;
