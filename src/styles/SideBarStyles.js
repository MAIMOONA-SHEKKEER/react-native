import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 250,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    padding: 20,
    zIndex: 1000,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#f0f4f7",
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
  },
});
