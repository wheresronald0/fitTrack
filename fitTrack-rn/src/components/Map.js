import React from "react";
import { View, Text, StyleSheet } from "react-native";

import MapView, { Polyline } from "react-native-maps";

const Map = (props) => {
  let points = [];
  for (let i = 0; i < 10; i++) {
    points.push({
      latitude: 27.498474 + i * 0.001,
      longitude: -82.491622 + i * 0.001,
    });
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 27.498474,
        longitude: -82.491622,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Polyline coordinates={points} />
    </MapView>
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
