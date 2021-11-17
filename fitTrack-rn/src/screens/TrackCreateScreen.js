import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import MapView from "react-native-maps";

import Map from "../components/Map";

const TrackCreateScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.container}>
        Track Create Screen!
      </Text>
      <Map />
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
  button: {
    width: 300,
    margin: 15,
  },
});

export default TrackCreateScreen;
