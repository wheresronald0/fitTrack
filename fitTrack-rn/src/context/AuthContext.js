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
    case "signInSuccess":
      return { ...state, token: action.payload, errorMessage: "" };
    case "sighOutUser":
      return { ...state, token: null };
    case "error":
      return {
        ...state,
        errorMessage: action.payload,
      };
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

  const tryLocalSignin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signInSuccess", payload: token });
      RootNavigation.navigate("MainFlow");
    } else {
      RootNavigation.navigate("LoginFlow");
    }
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
          type: "error",
          payload: "Uh oh, something went wrong with sign up",
        });
      }
    };
  };

  const signIn = (email, password) => {
    return async () => {
      try {
        const response = await trackerApi.post("/signin", {
          email,
          password,
        });
        console.log(response.data.token);
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "signInSuccess", payload: response.data.token });

        RootNavigation.navigate("MainFlow");
      } catch (err) {
        dispatch({
          type: "error",
          payload: "Uh oh, something went wrong with sign in",
        });
      }
    };
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    dispatch({ type: "signOutUser" });

    RootNavigation.navigate("LoginFlow");
  };

  return (
    <AuthContext.Provider
      value={{
        state: state,
        authCheck: authCheck,
        tryLocalSignin: tryLocalSignin,
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

  ----
  
  */
