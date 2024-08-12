import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
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
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        mode="outlined"
        style={{
          backgroundColor: "#FFFF",
        }}
        right={
          <TextInput.Icon
            name={() => (
              <MaterialIcons name={iconName} size={24} color="#4B0082" />
            )}
          />
        }
      />
    </View>
  );
}
