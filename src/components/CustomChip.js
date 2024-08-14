import React from "react";
import { Chip, Divider } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../styles/LoginScreenStyles";

const CustomChip = () => {
  return (
    <View style={styles.chipContainer}>
      <View style={styles.dividerLine} />
      <Chip style={styles.chip}>OR</Chip>
      <View style={styles.dividerLine} />
    </View>
  );
};

export default CustomChip;
