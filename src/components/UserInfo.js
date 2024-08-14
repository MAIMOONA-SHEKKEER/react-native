import React, { useState } from "react";
import { Avatar, Title, Text, Card, IconButton } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../styles/DashboardScreenStyles";

const UserInfo = ({ user }) => (
  <Card.Content>
    <Avatar.Text size={64} label={user.initial} style={styles.avatar} />
    <Title style={styles.name}>{user.name}</Title>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.infoContainer}>
        <IconButton icon="email" style={styles.icon} />
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <IconButton icon="home" style={styles.icon} />
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.info}>{user.address}</Text>
      </View>
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Details</Text>
      <View style={styles.infoContainer}>
        <IconButton icon="account-circle" style={styles.icon} />
        <Text style={styles.label}>User Type:</Text>
        <Text style={styles.info}>{user.userType}</Text>
      </View>
    </View>
  </Card.Content>
);

export default UserInfo;
