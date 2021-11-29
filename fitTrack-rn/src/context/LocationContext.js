import axios from "axios";
import React, { useReducer } from "react";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocationContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "add_current_location_to_map":
      return { ...state, currentLocation: action.payload };
    case "add_location_point":
      return { ...state, locations: [...state.locations, action.payload] };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "change_track_name":
      return { ...state, trackName: action.payload };
    case "save_track":
      return { ...state, locations: [], recording: false, trackName: "" };
    case "get_track_list":
      return { ...state, trackList: action.payload };
    default:
      return state;
  }
};

export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    locations: [],
    currentLocation: null,
    recording: false,
    trackName: "",
    trackList: [],
  });

  const startRecording = () => {
    dispatch({ type: "start_recording" });
  };

  const stopRecording = () => {
    dispatch({ type: "stop_recording" });
    //sill trigger "want to save?", and post to mongo "tracks"
  };

  const addLocation = (location, recording) => {
    console.log("tracking");
    dispatch({ type: "add_current_location_to_map", payload: location });
    if (recording) {
      dispatch({ type: "add_location_point", payload: location });
    }
  };

  const changeTrackName = (name) => {
    dispatch({ type: "change_track_name", payload: name });
    //console.log(name);
  };

  const saveTrack = async () => {
    await trackerApi.post("/tracks", {
      name: state.trackName,
      locations: state.locations,
    });
    dispatch({ type: "save_track" });
  };

  return (
    <LocationContext.Provider
      value={{
        state: state,
        startRecording: startRecording,
        stopRecording: stopRecording,
        addLocation: addLocation,
        changeTrackName: changeTrackName,
        saveTrack: saveTrack,
        //getTrackList: getTrackList,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
