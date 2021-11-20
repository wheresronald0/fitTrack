import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import MapView, { Polyline, Circle } from "react-native-maps";
import LocationContext from "../context/LocationContext";

const Map = (props) => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  console.log(locations);
  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ margin: 175 }} />;
  }
  //console.log(currentLocation.coords);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      //region={{
      //...currentLocation.coords,
      //latitudeDelta: 0.01,
      // longitudeDelta: 0.01,
      //}}
    >
      <Circle
        center={currentLocation.coords}
        radius={25}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, .3)"
      />
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
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
