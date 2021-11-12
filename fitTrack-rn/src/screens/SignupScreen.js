import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import AuthContext from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, authCheck } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(state);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Sign Up for a fitTrack
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
        title="Sign Up"
        style={styles.button}
        onPress={() => navigation.navigate("MainFlow")}
      />
      <Button
        title="Already Have and Account?"
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      />
      <Button
        title="Data"
        style={styles.button}
        onPress={() => {
          authCheck(false);
        }}
      />
      <Button
        title="Data2"
        style={styles.button}
        onPress={() => {
          authCheck(true);
        }}
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
