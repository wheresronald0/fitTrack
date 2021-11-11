import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const SigninScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Sign in Screen!</Text>
      <Button title="Log In" onPress={() => navigation.navigate("MainFlow")} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SigninScreen;
