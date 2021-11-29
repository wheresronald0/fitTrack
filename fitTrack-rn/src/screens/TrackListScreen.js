import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ListItem, Text } from "react-native-elements";
import LocationContext from "../context/LocationContext";

const TrackListScreen = ({ navigation }) => {
  const { state, getTrackList } = useContext(LocationContext);

  useFocusEffect(
    React.useCallback(() => {
      console.log("made track list call");
      getTrackList();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        Your Tracks
      </Text>
      <FlatList
        data={state.trackList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { id: item._id })
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    marginVertical: 20,
    alignSelf: "center",
  },
});

export default TrackListScreen;
