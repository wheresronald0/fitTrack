import React, { useEffect, useContext } from "react";
import { View, Button } from "react-native";

import AuthContext from "../context/AuthContext";

const LoadingScreen = ({ navigation }) => {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View>
      <Button
        title="To Login"
        onPress={() => {
          navigation.navigate("TrackList");
        }}
      />
    </View>
  );
};

export default LoadingScreen;
