import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import CustomButton from "../components/CustomButton";
import LinkText from "../components/LinkText";
import { styles } from "../styles/LoginScreenStyles";

export default function OtpLogin({
  otpSent,
  otp,
  onOtpChange,
  otpError,
  loading,
  onSendOtp,
  onVerifyOtp,
  showResendOtpButton,
  onResendOtpClick,
  reset
}) {
  return (
    <View style={styles.container}>
      {!otpSent ? (
        <CustomButton title={"Send OTP"} onPress={onSendOtp} loading={loading} />
      ) : (
        <>
          <OTPTextInput
            handleTextChange={onOtpChange}
            inputCount={6}
            defaultValue={otp}
            tintColor="#000" 
            offTintColor="#ccc"  
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpInput}
          />
          {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
          {!reset &&<CustomButton title={"Verify OTP"} onPress={onVerifyOtp} loading={loading} />}
          {loading && <ActivityIndicator style={styles.loader} />}
          {showResendOtpButton && (
            <LinkText title={"Resend OTP"} onPress={onResendOtpClick} disabled={loading} />
          )}
        </>
      )}
    </View>
  );
}
