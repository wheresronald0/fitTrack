import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import AuthContext from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, authCheck, signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(state.token);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Sign Up for a fitTrack
      </Text>
      <Input
        label="Email"
        style={styles.text}
        onChangeText={(data) => {
          setEmail(data);
        }}
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        style={styles.text}
        onChangeText={(data) => {
          setPassword(data);
        }}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      {state.errorMessage ? (
        <Text style={styles.error}>{state.errorMessage}</Text>
      ) : null}
      <Button
        title="Sign Up"
        style={styles.button}
        onPress={signUp(email, password)}
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
  error: {
    fontSize: 15,
    color: "red",
  },
});

export default SignupScreen;
/* 
     
      */
