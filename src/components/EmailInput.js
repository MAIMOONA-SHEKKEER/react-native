import React from "react";
import { Text } from "react-native";
import InputField from "../components/InputField";
import { styles } from "../styles/LoginScreenStyles";

export default function EmailInput({ value, onChangeText, error }) {
  return (
    <>
      <InputField
        label="Email"
        value={value}
        onChangeText={onChangeText}
        error={Boolean(error)}
        keyboardType="email-address"
        secureTextEntry={false} // 
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}
