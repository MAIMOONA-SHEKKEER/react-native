import React from 'react';
import { Text } from 'react-native-paper';

export default function LinkText({ title, onPress }) {
  return (
    <Text
      style={{ textAlign: 'center', marginVertical: 10, color: '#4B0082',marginBottom:20}}
      onPress={onPress}
    >
      {title}
    </Text>
  );
}
