import { View, Text, Pressable, TextInput, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { SignInStyle } from "@/stylesheets/signIn";
import { Link, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { UserRegister } from "@/types";
import { register } from "@/services/auth";

const SignUp = () => {
  const router = useRouter();
  const [dataForm, setDataForm] = useState<UserRegister>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = useCallback((key: keyof UserRegister, value: string) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [key]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (dataForm.password !== dataForm.confirmPassword) {
      Alert.alert("Error", "Password not match");
      return;
    }
    const { confirmPassword, ...data } = dataForm;
    const res = await register(data);

    if (res && res.status === 400) {
      Alert.alert("Error", "Something went wrong");
      return;
    }

    if (res && res.status === 201) {
      Alert.alert("Success", "Register successfully");
      router.navigate("/(Auth)");
    }
  }, [dataForm]);

  return (
    <View style={SignInStyle.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
        Sign Up
      </Text>
      <View style={SignInStyle.input}>
        <Feather name="user" size={24} color="black" />
        <TextInput
          placeholder="Username"
          value={dataForm.username}
          onChange={(e) => handleChange("username", e.nativeEvent.text)}
          style={{ paddingHorizontal: 10, width: "100%" }}
        />
      </View>
      <View style={SignInStyle.input}>
        <Feather name="lock" size={24} color="black" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={dataForm.password}
          onChange={(e) => handleChange("password", e.nativeEvent.text)}
          style={{ paddingHorizontal: 10, width: "100%" }}
        />
      </View>
      <View style={SignInStyle.input}>
        <Feather name="lock" size={24} color="black" />
        <TextInput
          placeholder="Confirm password"
          secureTextEntry
          value={dataForm.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.nativeEvent.text)}
          style={{ paddingHorizontal: 10, width: "100%" }}
        />
      </View>
      <Link href="/(Auth)" style={{ textAlign: "right" }}>
        <Text>
          Go back to
          <Text style={{ color: "#007AFF" }}> Sign in</Text>
        </Text>
      </Link>
      <Pressable style={SignInStyle.button} onPress={handleSubmit}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
