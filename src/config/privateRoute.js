import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomSnackbar from "../components/CustomSnackbar";
import { checkAuth } from "../utils/authUtils";

const PrivateRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigation = useNavigation();

  useEffect(() => {
    const verifyAuth = async () => {
      const status = await checkAuth(setSnackbar, navigation);
      setAuthStatus(status);
    };
    verifyAuth();
  }, [navigation]);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (authStatus === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!authStatus.auth) {
    return null;
  }

  return (
    <>
      {children}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default PrivateRoute;

