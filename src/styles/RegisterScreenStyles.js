import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, marginBottom: 20 },
  inputContainer: { marginBottom: 5 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { padding: 10 },
  errorText: { color: "red", fontSize: 12 },
  pickerContainer: { marginBottom: 5 },
  picker: {
    height: 50,
    width: "100%",
    borderStyle: "solid",
    backgroundColor: "white",
    borderColor: "black",
    marginBottom: 10,
  },
});
