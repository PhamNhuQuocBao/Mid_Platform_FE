import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const CreateStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: "flex",
    gap: 12,
  },
  input: {
    padding: 8,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.light.background,
    fontWeight: "bold",
  },
});
