import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
    margin:20
  },
  welcomeText: {
    textAlign: "center",
    margin: 30,
    color: "#4B0082",
    fontSize: 25,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  otpContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  otpInput: {
    borderWidth: 1,
    backgroundColor:"#fff",
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 15,
    borderRadius: 5,
    padding: 10,
  },
  inputFieldContainer: {
    marginBottom: 16,
  },
  loader: {
    marginTop: 10,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  chip: {
    marginHorizontal: 10,
  },
});
