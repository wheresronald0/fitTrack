import React, { useEffect, useState, useContext, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native"; //detects leaving a page similar to NavigationEvents
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

import Map from "../components/Map";
//import "../api/_mockLocation";
import TrackForm from "../components/TrackForm";
import LocationContext from "../context/LocationContext";
import useLocation from "../hook/useLocation";

const TrackCreateScreen = () => {
  const { state, addLocation } = useContext(LocationContext);

  // to trigger "on/off isTracking once I've navigated from the screen to save battery"
  const shouldTrack = useIsFocused();

  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );

  const [err] = useLocation(shouldTrack || state.recording, callback); //deconstructed return statment from useLocation hook

  return (
    <View style={styles.container}>
      <Text h3 style={styles.container}>
        Track Create Screen!
      </Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <View>
        <TrackForm />
      </View>
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

/* copy of entire component

 */
