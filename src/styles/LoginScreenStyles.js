import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent:"flex-start",
    margin:16
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#4B0082',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  otpContainer: {
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 15,
    borderRadius: 5,
  },
  loader: {
    marginTop: 10,
  },
});
