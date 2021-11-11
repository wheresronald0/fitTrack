import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Sign Up for a fitTrack
      </Text>
      <Input label="Email" style={styles.text} />
      <Input label="Password" style={styles.text} />
      <Button
        title="Sign Up"
        style={styles.button}
        onPress={() => navigation.navigate("MainFlow")}
      />
      <Button
        title="Already Have and Account?"
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 100,
  },
  text: {
    margin: 5,
  },
  button: {
    width: 300,
    margin: 15,
  },
});

export default SignupScreen;
