import React, { useState, useReducer } from "react";

const AuthContext = React.createContext();

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "isAuth":
      return action.payload;
    default:
      return state;
  }
};

//establish and export Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null);

  const authCheck = (tf) => {
    dispatch({ type: "isAuth", payload: tf });
  };

  return (
    <AuthContext.Provider
      value={{
        state: state,
        authCheck: authCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
