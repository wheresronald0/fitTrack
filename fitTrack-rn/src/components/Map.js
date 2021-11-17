import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import MapView, { Polyline } from "react-native-maps";
import LocationContext from "../context/LocationContext";

const Map = (props) => {
  const {
    state: { currentLocation },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ margin: 175 }} />;
  }
  console.log(currentLocation.coords);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    ></MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: "100%",
  },
});

export default Map;

/*

*/
