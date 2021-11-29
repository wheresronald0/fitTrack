import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import LocationContext from "../context/LocationContext";

const TrackListScreen = ({ navigation }) => {
  const { trackList, setTrackList } = useState([]);
  const { state, getTrackList } = useContext(LocationContext);

  const getInitialTrackList = () => {
    return console.log("made track list call");
    //getTrackList();
    //setTrackList(state.trackList);
  };

  useEffect(() => {
    getInitialTrackList();
  }, []);

  return (
    <View>
      <Text>Track List Screen!</Text>
      <FlatList
        data={trackList}
        keyExtractor={() => trackList.name}
        renderItem={({ item }) => {
          return <View>{item.name}</View>;
        }}
      />
      <Button
        title="Details"
        onPress={() => navigation.navigate("TrackDetail")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
