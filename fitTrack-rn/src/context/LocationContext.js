import React, { useReducer } from "react";

const LocationContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "addCurrentLocation":
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    locations: [],
    currentLocation: null,
    recording: false,
  });

  const startRecording = () => {
    dispatch({ type: "", payload: "" });
  };

  const stopRecording = () => {
    dispatch({ type: "", payload: "" });
  };

  const addLocation = (location) => {
    console.log("tracking");
    dispatch({ type: "addCurrentLocation", payload: location });
  };

  return (
    <LocationContext.Provider
      value={{
        state: state,
        startRecording: startRecording,
        stopRecording: stopRecording,
        addLocation: addLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
