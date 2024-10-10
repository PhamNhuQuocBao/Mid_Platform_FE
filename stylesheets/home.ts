import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    gap: 12,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
});
