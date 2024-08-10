import React from "react";
import LinkText from "../components/LinkText";

export default function ToggleLoginMethod({ loginMethod, toggleLoginMethod }) {
  return (
    <LinkText
      title={loginMethod === "email-password" ? "Login with OTP" : "Login with Password"}
      onPress={toggleLoginMethod}
    />
  );
}
