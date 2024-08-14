import React from "react";
import { Snackbar } from "react-native-paper";
import { View, Text} from "react-native";
import { styles } from "../styles/SnackbarStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CustomSnackbar = ({ visible, onDismiss, message, type = "error" }) => {
  const isSuccess = type === "success";

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={6000}
      style={[styles.snackbar, isSuccess && styles.successSnackbar]}
      action={{
        label: "Close",
        onPress: onDismiss,
      }}
    >
      <View style={styles.content}>
        <MaterialIcons
          name={isSuccess ? "check-circle" : "error"}
          size={24}
          color={isSuccess ? "#155724" : "#721c24"}
          style={styles.icon}
        />
        <Text style={[styles.message, isSuccess && styles.successMessage]}>
          {message}
        </Text>
      </View>
    </Snackbar>
  );
};

export default CustomSnackbar;
