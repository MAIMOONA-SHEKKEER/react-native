import React, { useState } from "react";
import { View } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { useResetPassword } from "../hooks/useResetPassword";
import OTPInputView from "react-native-otp-textinput";
import LinkText from "../components/LinkText";
import InputField from "../components/InputField";
import OtpLogin from "../components/OtpInput";

const ResetPasswordScreen = () => {
  const {
    credentials,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSendOtp,
    loading,
    handleOtpChange,
    showResendOtpButton,
    onResendOtpClick,
    setSnackbar,
  } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <LinkText
        title={otpSent ? "Reset Password" : "Request OTP for Password Change"}
      />
      {!otpSent ? (
        <>
          <TextInput
            mode="outlined"
            label="Email Address"
            value={credentials.email}
            onChangeText={(value) => handleChange("email", value)}
            error={!!errors.email}
            style={{ marginBottom: 16 }}
          />
          {errors.email ? (
            <Text style={{ color: "red" }}>{errors.email}</Text>
          ) : null}
          <Button
            mode="contained"
            onPress={handleSendOtp}
            disabled={!credentials.email.trim() || loading}
            loading={loading}
            style={{ marginBottom: 16 }}
          >
            Send OTP
          </Button>
        </>
      ) : (
        <>
             <OtpLogin
            otpSent={otpSent}
            otp={credentials.otp}
            onOtpChange={handleOtpChange}
            otpError={errors.otp}
            loading={loading}
            onSendOtp={handleSendOtp}
            onVerifyOtp={handleSubmit}
            showResendOtpButton={showResendOtpButton}
            onResendOtpClick={onResendOtpClick}
            reset={"reset"}
          />

          <InputField
            label="New Password"
            secureTextEntry={!showPassword}
            value={credentials.newPassword}
            onChangeText={(value) => handleChange("newPassword", value)}
            error={!!errors.newPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={handleClickShowPassword}
              />
            }
          />
          {errors.newPassword ? (
            <Text style={{ color: "red" }}>{errors.newPassword}</Text>
          ) : null}
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            style={{ marginBottom: 16 }}
          >
            Reset
          </Button>

          {showResendOtpButton && (
            <Button mode="text" onPress={onResendOtpClick}>
              Resend OTP
            </Button>
          )}
        </>
      )}

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
        duration={3000}
      >
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

export default ResetPasswordScreen;
