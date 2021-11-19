import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFocusEffect, useIsFocused } from "@react-navigation/native"; //detects leaving a page similar to NavigationEvents
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
  remove,
} from "expo-location";

import Map from "../components/Map";
//import "../api/_mockLocation";
import LocationContext from "../context/LocationContext";

const TrackCreateScreen = ({ navigation }) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const { addLocation, state } = useContext(LocationContext);

  const tracking = useIsFocused();
  //console.log(tracking);

  const startWatching = async () => {
    try {
      await requestForegroundPermissionsAsync();
      const sub = await watchPositionAsync(
        //simulated IOS simulator data, with mockLocation turned off (use with physical device)
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 20000,
          distanceInterval: 10,
        },
        (location) => {
          addLocation(location);
        }
      );

      setSubscriber(sub); //gives state access to the entire watchPositionAsynce so I can .remorve() and stop tracking
    } catch (e) {
      setErr(e);
      console.log(e); //IOS not trhowing an err
    }
  };

  // to trigger "on/off tracking once I've navigated from the screen to save battery"
  React.useEffect(() => {
    if (tracking) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
      console.log("removed");
    }
  }, [tracking]);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.container}>
        Track Create Screen!
      </Text>
      <Button
        title="Stop"
        onPress={() => {
          stopWatching();
        }}
      />
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
