import React from "react";
import { Text } from "react-native";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { styles } from "../styles/LoginScreenStyles";
import LinkText from "./LinkText";

export default function PasswordLogin({
  password,
  onPasswordChange,
  onSubmit,
  error,
  loading,
  navigation,
}) {
  return (
    <>
      <InputField
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        error={!!error}
        showEyeIcon
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <LinkText
        title={"Forgot Password?"}
        onPress={() => navigation.navigate("Reset Password")}
      />
      <CustomButton title={"Login"} onPress={onSubmit} loading={loading} />
    </>
  );
}
