import React from "react";
import { View, TextInput as RNTextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function InputField({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) {
  let iconName;

  if (secureTextEntry) {
    iconName = "lock";
  } else if (keyboardType === "phone-pad") {
    iconName = "phone";
  } else if (keyboardType === "email-address") {
    iconName = "email";
  } else {
    iconName = "account-circle";
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <RNTextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={{
          borderWidth: 1,
          borderColor: "#4B0082",
          padding: 10,
          color: "#4B0082",
          borderRadius: 5,
          backgroundColor: "#FFFF",
        }}
      />
      <MaterialIcons
        name={iconName}
        size={24}
        color="#4B0082"
        style={{ position: "absolute", right: 8, top: 8 }}
      />
    </View>
  );
}
