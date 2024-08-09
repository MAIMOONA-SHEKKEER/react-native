import React from 'react';
import { TextInput } from 'react-native-paper';

export default function InputField({ label, value, onChangeText, secureTextEntry, keyboardType }) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      mode="outlined"
      style={{ marginBottom: 16,color:"#4B0082"}}
    />
  );
}
