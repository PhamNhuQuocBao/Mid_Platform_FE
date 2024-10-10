import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { SignInStyle } from "@/stylesheets/signIn";
import { Link, useRouter } from "expo-router";
import { User } from "@/types";
import { login } from "@/services/auth";

const SignIn = () => {
  const router = useRouter();
  const [dataForm, setDataForm] = useState<User>({
    username: "",
    password: "",
  });

  const handleChange = useCallback((key: keyof User, value: string) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [key]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!dataForm.username || !dataForm.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const res = await login(dataForm);

    if (res && res.status === 404) {
      Alert.alert("Error", "User not exist");
      return;
    }
    if (res && res.status === 401) {
      Alert.alert("Error", "Wrong password");
      return;
    }
    if (res && res.status === 200) {
      router.replace("/home");
    }
  }, [dataForm]);

  return (
    <View style={SignInStyle.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
        Sign In
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
      <Link href="/(Auth)/signUp" style={{ textAlign: "right" }}>
        <Text>
          Do you have an account yet?{" "}
          <Text style={{ color: "#007AFF" }}>Sign Up</Text>
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
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
