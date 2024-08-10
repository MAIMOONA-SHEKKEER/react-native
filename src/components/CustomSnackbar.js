import React from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const CustomSnackbar = ({
  visible,
  message,
  onDismiss,
  duration = 5000,
  type = "info",
}) => {
  const backgroundColor =
    type === "error" ? "red" : type === "success" ? "green" : "black";

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={duration}
        action={{
          label: "Dismiss",
          onPress: () => {
            onDismiss();
          },
        }}
        style={[styles.snackbar, { backgroundColor }]}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  snackbar: {
    marginBottom: 16,
  },
});

export default CustomSnackbar;
