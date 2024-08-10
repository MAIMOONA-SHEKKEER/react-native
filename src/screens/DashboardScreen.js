import React, { useState } from "react";
import { Avatar, Title, Text, Button, Card, IconButton } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import Sidebar from '../components/Sidebar';
import { styles } from "../styles/DashboardScreenStyles";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <IconButton icon="menu" size={28} style={styles.menuIcon} onPress={toggleSidebar} />
      </TouchableOpacity>
      
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Avatar.Text size={64} label="J" style={styles.avatar} />
            <Title style={styles.name}>John Doe</Title>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <View style={styles.infoContainer}>
                <IconButton icon="email" style={styles.icon} />
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.info}>john.doe@example.com</Text>
              </View>
              <View style={styles.infoContainer}>
                <IconButton icon="home" style={styles.icon} />
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.info}>123 Main St, Anytown, USA</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Details</Text>
              <View style={styles.infoContainer}>
                <IconButton icon="account-circle" style={styles.icon} />
                <Text style={styles.label}>User Type:</Text>
                <Text style={styles.info}>Premium User</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        
        <CustomButton title={"LOGOUT"}   onPress={() => navigation.navigate("Login")} />
     
      </View>
    </View>
  );
};

export default DashboardScreen;
