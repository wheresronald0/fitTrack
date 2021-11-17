import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

import Map from "../components/Map";
//import "../api/_mockLocation";

const TrackCreateScreen = (props) => {
  const { err, setErr } = useState(null);

  const startWatching = async () => {
    try {
      await requestForegroundPermissionsAsync();
      await watchPositionAsync(
        //simulated IOS simulator data, with mockLocation turned off (use with physical device)
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          //console.log(location);
        }
      );
    } catch (e) {
      setErr(e);
      console.log(e); //IOS not trhowing an err
    }
  };

  useEffect(() => {
    startWatching();
  }, []);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.container}>
        Track Create Screen!
      </Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
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
/*
 */
