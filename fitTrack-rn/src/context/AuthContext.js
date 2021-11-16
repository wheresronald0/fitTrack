import React, { useState, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import trackerApi from "../api/tracker";
import * as RootNavigation from "../components/RootNavigation";

const AuthContext = React.createContext();

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "isAuth":
      return action.payload;
    case "signUpSuccess":
      return { ...state, token: action.payload, errorMessage: "" };
    case "failedToSignUp":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

//establish and export Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    errorMessage: "",
    token: null,
  });

  const authCheck = (tf) => {
    dispatch({ type: "isAuth", payload: tf });
  };

  const signUp = (email, password) => {
    return async () => {
      try {
        const response = await trackerApi.post("/signup", {
          email,
          password,
        });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "signUpSuccess", payload: response.data.token });
        //if all goes well I'll get a the response with the JWT stored in my var

        RootNavigation.navigate("MainFlow"); //navigates after auth
      } catch (err) {
        dispatch({
          type: "failedToSignUp",
          payload: "Uh oh, something went wrong with sign up",
        });
      }
    };
  };

  const signIn = () => {
    return { email: email, password: password };
  };

  const signOut = () => {
    return { email: email, password: passwood };
  };

  return (
    <AuthContext.Provider
      value={{
        state: state,
        authCheck: authCheck,
        signIn: signIn,
        signUp: signUp,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

/*
const signUp = (email, password) => {
    console.log(email, password);
    return async ({}) => {
      try {
        const response = await trackerApi.post("/signup", {
          email,
          password,
        });
        console.log(response.data); //if all goes well I'll get a the response with the JWT stored in my var
      } catch (err) {
        console.log(err.message + "damn");
      }
    };
  };
  */
