import React from "react";
import { Text } from "react-native-paper";

export default function LinkText({ title, onPress, fontSize }) {
  return (
    <Text
      style={{
        textAlign: "center",
        marginVertical: 10,
        color: "#4B0082",
        marginBottom: 20,
        fontSize: fontSize ? fontSize : 15,
      }}
      onPress={onPress}
    >
      {title}
    </Text>
  );
}
