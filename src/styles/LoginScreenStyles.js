import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f7",
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
});
