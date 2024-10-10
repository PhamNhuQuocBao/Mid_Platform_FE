import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const ProductItemStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    padding: 8,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    alignItems: "center",
  },
  actionContainer: {},
});
