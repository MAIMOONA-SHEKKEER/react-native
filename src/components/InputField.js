import React from 'react';
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function InputField({ label, value, onChangeText, secureTextEntry, keyboardType }) {
  let iconName;

  if (secureTextEntry) {
    iconName = 'lock';
  } else if (keyboardType === 'phone-pad') {
    iconName = 'phone';
  } else if (keyboardType === 'email-address') {
    iconName = 'email';
  } else {
    iconName = 'text-fields';
  }

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      mode="outlined"
      style={{ marginBottom: 16, color: '#4B0082' }}
      left={<TextInput.Icon name="email" size={24} color="#4B0082" />}    />
  );
}
