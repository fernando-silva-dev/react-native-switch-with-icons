import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  thumb: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,

    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  icon: {
    resizeMode: "contain",
  },
  pressedIndicator: {
    position: "absolute",
    opacity: 0.2,
  },
});
