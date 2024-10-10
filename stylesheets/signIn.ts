import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const SignInStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "stretch",
    gap: 20,
  },
  input: {
    backgroundColor: Colors.light.background,
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
  },
});
