import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import { styles } from "../styles/FeedbackScreenStyles";

const FeedbackComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { message } = route.params || {};

  const handleBack = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.innerContainer}>
          <Image
            source={require("../images/success.png")}
            style={styles.image}
          />
          <Text style={styles.message}>Congratulations,{message}</Text>
          <CustomButton onPress={handleBack} title={"Go to Login"} />
        </View>
      </View>
    </View>
  );
};

export default FeedbackComponent;
