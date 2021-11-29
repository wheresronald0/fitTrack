import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LocationContext from "../context/LocationContext";

const TrackListScreen = ({ navigation }) => {
  const { state, getTrackList } = useContext(LocationContext);

  const getInitialTrackList = () => {
    console.log("made track list call");
    getTrackList();
  };

  useEffect(() => {
    getInitialTrackList();
  }, []);

  return (
    <View>
      <Text>Track List Screen!</Text>
      <FlatList
        data={state.trackList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("TrackDetail")}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
