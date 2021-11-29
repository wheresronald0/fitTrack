import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import LocationContext from "../context/LocationContext";

const TrackForm = () => {
  const { state, startRecording, stopRecording, changeTrackName, saveTrack } =
    useContext(LocationContext);

  console.log(state.locations.length);

  return (
    <View>
      <Input
        placeholder="Enter Track Name to Record"
        style={styles.textInput}
        onChangeText={(name) => {
          changeTrackName(name);
        }}
        value={state.trackName}
      />
      {state.recording ? (
        <Button
          title="Stop Recording Track"
          style={styles.button}
          onPress={stopRecording}
        />
      ) : (
        <Button
          title="Record Track"
          style={styles.button}
          onPress={startRecording}
        />
      )}
      {state.locations.length && !state.recording ? (
        <Button title="Save Track" style={styles.button} onPress={saveTrack} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    margin: 15,
  },
  textInput: {
    margin: 15,
    borderRadius: 1,
    borderColor: "red",
  },
});

export default TrackForm;
