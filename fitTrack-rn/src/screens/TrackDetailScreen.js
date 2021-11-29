import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import LocationContext from "../context/LocationContext";

const TrackDetailScreen = ({ route }) => {
  const { state } = useContext(LocationContext);
  const { id } = route.params;
  console.log(id);

  const track = state.trackList.find((t) => t._id === id);
  console.log(track);

  return (
    <View>
      <Text>Track Detail Screen!</Text>
      <Text>{track.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackDetailScreen;
