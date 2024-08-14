import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import {useRoute } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from "../styles/FeedbackScreenStyles";
import useLogin from "../hooks/useLogin";

const FeedbackComponent = () => {
  const {
    handleBack
  } = useLogin();

  const route = useRoute();
  const { message = "No message provided", type = "info" } = route.params || {};

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Icon name="check-circle" size={100} color="green" />;
      case "error":
        return <Icon name="error" size={100} color="red" />;
      default:
        return <Icon name="info" size={100} color="blue" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.title}>
        {type === "success" ? "Congratulations!" : type === "error" ? "Oops!" : "Notification"}
      </Text>
      <Text style={styles.message}>{message}</Text>
      <CustomButton onPress={handleBack} title={type === "success" ? "Go to Login" : "Try Login Again"} />
    </View>
  );
};

export default FeedbackComponent;