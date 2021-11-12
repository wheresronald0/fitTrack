import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Sign In to fitTrack
      </Text>
      <Input
        label="Email"
        style={styles.text}
        onChange={(data) => setEmail(data)}
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        style={styles.text}
        onChange={(data) => setPassword(data)}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Button
        title="Sign In"
        style={styles.button}
        onPress={() => navigation.navigate("MainFlow")}
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
    marginVertical: 50,
  },
  text: {
    margin: 5,
  },
  button: {
    width: 300,
    margin: 15,
  },
});

export default SigninScreen;
