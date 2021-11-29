import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import AuthContext from "../context/AuthContext";

const AccountScreen = (props) => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        Settings
      </Text>
      <Button title="Log Out" style={styles.button} onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 50,
  },
  button: {
    width: 300,
    margin: 15,
  },
});

export default AccountScreen;
